import { MenuItem, OrderItem } from "../types";

export type OrderActions =
    { type: "add-Item", payload: { item: MenuItem} } |
    { type: "remove-Item", payload: { id: MenuItem["id"] } } |
    { type: "place-Order" } |
    { type: "add-Tip", payload: { value: number } }

export type OrderState = {
    order: OrderItem[],
    tip: number
}

export const initialState : OrderState = {
    order: [],
    tip: 0
}

export const orderReducer = (state: OrderState = initialState, action: OrderActions) => {
    

    if (action.type === "add-Item") {
        const itemExist = state.order.find( orderItem => orderItem.id === action.payload.item.id)
        let updatedOrder : OrderItem[] = [];
        if (itemExist) {
            updatedOrder = state.order.map( orderItem => orderItem.id === action.payload.item.id ? 
                { ...orderItem, quantity: orderItem.quantity + 1 } : 
                orderItem 
            );
        } else {
            const newItem : OrderItem  = { ...action.payload.item, quantity: 1 }
            updatedOrder = [...state.order, newItem]
        }

        return {
            ...state,
            order: updatedOrder
        }
    }

    if (action.type === "remove-Item") {

        const updatedOrder = (state.order.filter( (orderItem) => orderItem.id !== action.payload.id))
        return {
        ...state,
        order: updatedOrder
        }
    }

    if (action.type === "place-Order") {
        return {
        ...state
        }
    }

    if (action.type === "add-Tip") {
        return {
        ...state
        }
    }
}