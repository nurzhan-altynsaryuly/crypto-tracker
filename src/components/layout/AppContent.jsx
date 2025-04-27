import { Layout, Typography } from 'antd';
import { useContext } from 'react';
import { CryptoContext } from '../../context/crypto-context';
import { PortfolioChart } from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 64px)',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '30px'
};

export default function AppContent() {
    const {assets, coins} = useContext(CryptoContext)
    if(coins.length) return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={2} style={{color: 'white', textAlign: 'start'}}>Portfolio:
                {' '}
                {assets.map(asset => {
                    const coin = coins.find(coin => asset.id == coin.id)
                    return asset.amount * coin.price
                }).reduce((acc, v) => acc += v, 0).toFixed(2)}$
            </Typography.Title>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    )
}