import { OrdersType } from "@/lib/orders.type";
import Orders from "./components/orders";
import api from "@/services/api";
import { getCookieServer } from "@/lib/cookiesServer";

async function getOrders(): Promise<OrdersType[] | []> {
    try {
        const token = await getCookieServer()
        const response = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data || []
    } catch (error) {
        console.log(error)
        return []
    }
}

export default async function Dashboard() {
    const orders = await getOrders()
    return (
        <>
            <Orders orders={orders} />
        </>
    )
}