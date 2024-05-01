import Card from '../Card'

interface OrderCardProps {
  order: {
    number: number
    dateTime: string
    address: string
    food: string
    name: string
  }
  className?: string
  onClick?: () => {}
}

const OrderCard = (props: OrderCardProps) => {
  return (
    <div onClick={props.onClick}>
      <Card order={props.order} className={props.className} />
    </div>
  )
}

export default OrderCard
