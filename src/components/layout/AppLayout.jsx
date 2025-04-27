import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader';
import AppSider from './AppSider';
import AppContent from './AppContent';
import { CryptoContext } from '../../context/crypto-context';
import { useContext } from 'react';

export function AppLayout() {

    const {loading} = useContext(CryptoContext)

    if(loading) return <Spin fullscreen />
    return (
        <Layout>
            <AppHeader></AppHeader>
            <Layout>
                <AppSider></AppSider>
                <AppContent></AppContent>
            </Layout>
        </Layout>
    )
}