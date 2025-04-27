import { Table } from "antd";
import { useContext } from "react";
import { CryptoContext } from "../context/crypto-context";

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Price $',
      dataIndex: 'price',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
  ];

export default function AssetsTable() {

    const {assets} = useContext(CryptoContext)

    const data = assets.map(asset => ({ 
        key: asset.id,
        name: asset.name,
        price: asset.price,
        amount: asset.amount
    }))

    return (
        <Table
            style={{marginTop: '50px'}}
            pagination={false}
            columns={columns}
            dataSource={data}
            showSorterTooltip={{ target: 'sorter-icon' }}
        />
    )
}