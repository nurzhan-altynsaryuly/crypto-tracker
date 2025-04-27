import { Divider, Flex, Tag, Typography } from "antd"

export default function ModalInfo({coin}) {
    return (
        <>    
            <Flex align='center'>
                <img src={coin.icon} alt={coin.id} width={40}></img>
                <Typography.Title style={{marginLeft: '10px', marginBottom: '0px'}} level={2}>({coin.symbol}) {coin.name}</Typography.Title>
            </Flex>
            <Divider />
            <Flex align='center'>
                <Typography.Paragraph>
                    <Typography.Text strong style={{marginRight: '10px'}}>1 hour:</Typography.Text>
                    <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <Typography.Text strong style={{marginRight: '10px'}}>1 day:</Typography.Text>
                    <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <Typography.Text strong style={{marginRight: '10px'}}>1 week:</Typography.Text>
                    <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
                </Typography.Paragraph>
            </Flex>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price BTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market Cap: </Typography.Text>
                {coin.marketCap}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Contract Address: </Typography.Text>
                {coin.contractAddress}
            </Typography.Paragraph>
        </>
    )
}