import { useState } from "react"
import type { MenuItem, OrderItem } from "../types"

export default function useOrder() {
    const [ order, setOrder ] = useState<OrderItem[]>([])

    const [ tip, setTip ] = useState(0)

    const addItem = ( item : MenuItem) => {

        const itemExist = order.find( (orderItem) => orderItem.id === item.id)
        if (itemExist) {
            setOrder(order.map( (orderItem) => orderItem.id === item.id ? { ...itemExist, quantity: orderItem.quantity + 1 } : orderItem))
            return
        } else {
            const newItem : OrderItem  = { ...item, quantity: 1 }
            setOrder([...order, newItem])
        }
    }

    const removeItem = ( id: MenuItem["id"] ) => {
        setOrder(order.filter( (orderItem) => orderItem.id !== id))
    }

    const placeOrder = () => {
        setOrder([]);
        setTip(0)
    }


    return {
        order,
        tip,
        setTip,
        addItem,
        removeItem,
        placeOrder
    }
}