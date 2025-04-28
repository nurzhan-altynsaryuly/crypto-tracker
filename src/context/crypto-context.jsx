import { createContext, useState, useEffect } from "react";
import { percentDifferences } from '../utils';

export const CryptoContext = createContext(
    {
        assets: [],
        coins: [],
        loading: false
    }
)

export function CryptoContextProvider({children}) {
    const [loading, setLoading] = useState(false)
    const [coins, setCoins] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets, data) {
        console.log(assets, data)
        const newAssets = assets.map(asset => {
            const coin = data.find(coin => coin.id == asset.id)
            return {
                grow: asset.price < coin.price,
                growPercent: percentDifferences(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset,
            }
        })
        localStorage.setItem('assets', JSON.stringify(newAssets))
        return newAssets
    }

    useEffect(() => {
        async function load() {
            setLoading(true)
            
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  'X-API-KEY': 'YJml5A6BZyU3LyT0Gy8D3MOFPRgwQkUy9z5mmAgzlAw='
                }
              };
              
            const data = await fetch('https://openapiv1.coinstats.app/coins', options)
                .then(res => res.json())
                .then(data => data.result)
                .catch(err => console.error(err));
            
            const dataAssets = JSON.parse(localStorage.getItem('assets'))
            const dataAsset = [{
                amount: 4,
                id: 'bitcoin',
                price: '65234'
            }]
            setCoins(data)
            setAssets(mapAssets(dataAssets.length ? dataAssets : dataAsset, data))
            setLoading(false)
        }
        load()
    }, [])

    function addAsset(newAsset) {
        setAssets(prev => mapAssets([...prev, newAsset], coins))
    }

    function deleteAsset(idx) {
        const newAssets = assets.filter(asset => asset.id != assets[idx].id)
        setAssets(newAssets)
        localStorage.setItem('assets', JSON.stringify(newAssets))
    }

    return <CryptoContext.Provider value={{loading, assets, coins, addAsset, deleteAsset}}>{children}</CryptoContext.Provider>
}