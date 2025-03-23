'use client'
import { RefreshCcw } from "lucide-react"
import styles from "./styles.module.scss"
import { OrdersType } from "@/lib/orders.type"
import ModalOrder from "../modal"
import { use } from "react"
import { OrderContext } from "@/providers/order"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface OrdersProps {
    orders: OrdersType[]
}

export default function Orders({ orders }: OrdersProps) {
    const router = useRouter()
    const { isOpen, handleRequestOpen } = use(OrderContext)
    async function handleOpen(orderId: string) {
        await handleRequestOpen(orderId)
    }
    function handleRefresh() {
        router.refresh()
        toast.success('Pedidos atualizados!')
    }

    return (
        <>
            <main className={styles.ordersContainer}>
                <section className={styles.ordersHeader} >
                    <h1>Ultimos pedidos</h1>
                    <button onClick={handleRefresh}>
                        <RefreshCcw color={orders.length === 0 ? 'var(--red-900)' : 'var(--green-100)'} size={24} />
                    </button>
                </section>
                {orders.length === 0 && <strong className={styles.alert}>Sem pedidos no momento.. </strong>}
                <section className={styles.listOrders}>
                    {orders.map((item) => (<button key={item.id} className={styles.orderItem} onClick={() => handleOpen(item.id)}>
                        <div className={styles.tag}></div>
                        <span>Mesa {item.table}</span>
                    </button>))}
                </section>
            </main>
            {isOpen && <ModalOrder />}
        </>
    )
}