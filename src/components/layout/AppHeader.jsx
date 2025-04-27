import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useContext, useState } from 'react';
import { CryptoContext } from '../../context/crypto-context';
import ModalInfo from '../ModalInfo';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
    color: '#fff',
    backgroundColor: '#001529',
    display: 'flex',
    padding: '30px',
    justifyContent: 'space-between',
    alignItems: 'center'
};


export default function AppHeader() {
    const {coins} = useContext(CryptoContext)

    const [modal, setModal] = useState(false)
    const [coin, setCoin] = useState(null)
    const [select, setSelect] = useState(false)
    const [open, setOpen] = useState(false)
    
    function handleSelect(value) {
        setCoin(coins.find(c => c.id == value))
        setModal(true)
    }
    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{ width: '250px' }}
                onSelect={handleSelect}
                value="Press to open"
                open={select}
                onClick={() => setSelect(prev => !prev)}
                options={coins.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={option => (
                <Space>
                    <span role="img" aria-label={option.data.label}>
                    <img src={option.data.icon} alt={option.data.value} style={{width: 20}}></img>
                    </span>
                    {option.data.value}
                </Space>
                )}
            />
            <Button type="primary" size='large' onClick={() => setOpen(true)}>
                Add Asset
            </Button>

            <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
                <ModalInfo coin={coin} />
            </Modal>

            <Drawer title="Add Asset" onClose={() => setOpen(false)} open={open} destroyOnClose>
                <AddAssetForm onClose={() => setOpen(false)}/>
            </Drawer>
        </Layout.Header>
    )
}