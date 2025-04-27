import { Typography, Select, Space, Flex, Divider, Form, InputNumber, Button, DatePicker, Result } from "antd"
import { useState, useContext } from "react"
import { CryptoContext } from "../context/crypto-context"

const validateMessages = {
    required: "${name} is required!",
  };

export default function AddAssetForm({onClick, onClose}) {
    const {coins, addAsset} = useContext(CryptoContext)
    const [coin, setCoin] = useState(null)

    const [form] = Form.useForm()
    const[result, setResult] = useState(false)

    const [asset, setAsset] = useState(null)

    if(result) {
        return (
            <Result
                status="success"
                title='New Asset Added'
                subTitle={`${asset.amount} of ${coin.name} added by price ${asset.price}$!`}
                extra={[
                <Button type="primary" key="console" onClick={onClose}>
                    Close
                </Button>,
                ]}
            />
        )
    }
    
    if(!coin) {
        return (
            <>  
                <Select
                    style={{ width: '100%' }}
                    value="Press to open"
                    onSelect={(value) => setCoin(coins.find((coin) => coin.id == value))}
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
            </>
        )
    }

    function onFinish(value) {
        const asset = {
            id: coin.id,
            amount: +value.amount,
            price: +value.price,
            date: value.date?.$d ?? new Date() 
        }
        setAsset(asset)
        addAsset(asset)
        setResult(true)
    }

    function handleAmount(value) {
        form.setFieldsValue({
            total: +(value * coin.price).toFixed(2)
        })
    }
    
    return (
        <>
            <Flex align='center'>
                <img src={coin.icon} alt={coin.id} width={40}></img>
                <Typography.Title style={{marginLeft: '10px', marginBottom: '0px'}} level={2}>({coin.symbol}) {coin.name}</Typography.Title>
            </Flex>
            <Divider />
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 20}}
                style={{ maxWidth: 700 }}
                onFinish={onFinish}
                validateMessages={validateMessages}
                initialValues={
                    {
                        price: coin.price.toFixed(2)
                    }
                }
            >
                <Form.Item
                label="Amount"
                name="amount"
                rules={[{ required: true, type: 'number', min: 0}]}
                >
                <InputNumber onChange={handleAmount} style={{width: '100%'}} />
                </Form.Item>

                <Form.Item
                label="Price"
                name="price"
                >
                <InputNumber style={{width: '100%'}} disabled/>
                </Form.Item>
                
                <Form.Item
                label="Date"
                name="date"
                >
                <DatePicker showTime style={{width: '100%'}} />
                </Form.Item>

                <Form.Item
                label="Total"
                name="total"
                >
                <InputNumber style={{width: '100%'}} disabled/>
                </Form.Item>

                <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>
        </>
    )
}