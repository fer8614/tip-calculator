import { useMemo } from "react"
import { OrderItem } from "../types"
import { formatCurrency } from "../helpers"

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void
}
export default function OrderTotals( { order, tip, placeOrder }: OrderTotalsProps ) {

    const subTotalAmount = useMemo(() => order.reduce( (total, item) => total + (item.price * item.quantity), 0), [order])

    const tipAmount = useMemo(() => subTotalAmount * tip, [ tip, order ])

    const totalAmount = useMemo(() => subTotalAmount + tipAmount, [ tip, order ]) 

  return (
    <>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totals and tips: </h2>
            <p>Subtotal to pay:{' '}
                <span className="font-bold">{ formatCurrency( subTotalAmount ) }</span>
            </p>

            <p>Tip: {' '}
                <span className="font-bold">{ formatCurrency( tipAmount ) }</span>
            </p>

            <p>Total to pay: {' '} 
                <span className="font-bold">{ formatCurrency( totalAmount ) }</span>
            </p>
        </div>

        <button className="w=full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
                disabled={totalAmount === 0}
                onClick={placeOrder}>
            Save order
        </button>
    </>
  )
}
