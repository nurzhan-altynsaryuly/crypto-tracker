import { Layout, Card, Statistic, List, Typography, Spin, Tag, Button } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useContext } from 'react';
import { CryptoContext } from '../../context/crypto-context';

const siderStyle = {
    textAlign: 'start',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '30px'
};


export default function AppSider() {
    
    const {assets, deleteAsset} = useContext(CryptoContext)
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map((asset, idx) => 
            (
                <Card key={asset.id} style={ { marginBottom: '1rem', position: 'relative' } }>
                    <Button type="primary" danger style={{position: 'absolute', top: '10px', right: '20px'}} onClick={() => deleteAsset(idx)}>
                        Delete
                    </Button>
                    <Statistic
                        title={capitalize(asset.id)}
                        value={asset.totalAmount}
                        precision={2}
                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322'}}
                        prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        suffix="$"
                    />
                    <List
                        size='small'
                        dataSource={[
                            { title: 'Total profit', value: Number(asset.totalProfit), withTag: true},
                            { title: 'Asset amount', value: asset.amount, isPlain: true }
                        ]}
                        renderItem={item => (
                            <List.Item>
                            <span>{item.title}</span>
                            <span>
                                {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                {item.isPlain && item.value}
                                {!item.isPlain && <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value.toFixed(2)}$</Typography.Text>} 
                            </span>
                            </List.Item>
                        )}
                    />
                </Card>
            ))}
        </Layout.Sider>
    )
}