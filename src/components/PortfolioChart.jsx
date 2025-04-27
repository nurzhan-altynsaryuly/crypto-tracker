import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext } from 'react';
import { CryptoContext } from '../context/crypto-context';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PortfolioChart() {

    
const {assets} = useContext(CryptoContext)

    const data = {
        labels: assets.map(asset => asset.name),
        datasets: [
            {
            data: assets.map(asset => asset.totalAmount),
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            },
        ],
    };

    return (
        <div style={{display: 'flex', justifyContent: 'center', height: '400px'}}>
            <Pie data={data}></Pie>
        </div>
    )
}