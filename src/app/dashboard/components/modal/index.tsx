'use client'
import { X } from "lucide-react"
import styles from "./styles.module.scss"
import { use } from "react"
import { OrderContext } from "@/providers/order"
import { calculateTotalOrder } from "@/lib/totalOrder"

export default function ModalOrder() {

    const { handleRequestClose, order, finishOrder } = use(OrderContext)
    function handleClose() {
        handleRequestClose()
    }
    async function handleFinish() {
        await finishOrder(order[0].order.id)
    }

    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={handleClose}>
                    <X size={40} color="#FF3f4b" />
                </button>
                <article className={styles.Container}>
                    <h2>Detalhes do pedido</h2>
                    <span className={styles.table}>
                        Mesa - <b>{order[0].order.table}</b>
                    </span>
                    {order.map((item) => (
                        <section className={styles.item} key={item.id}>
                            <span>  {item.amount} un - <b> {item.product.name}</b>  R$ {item.amount * parseFloat(item.product.price)}</span>
                            <span className={styles.description}> {item.product.description}</span>
                        </section>
                    ))
                    }
                    <span className={styles.total}>Valor total do pedido R$ {calculateTotalOrder(order)}</span>
                </article>
                <button className={styles.finishButton} onClick={handleFinish}>Concluir pedido</button>
            </section>
        </dialog>
    )
}