import { getCookieServer } from "@/lib/cookiesServer"
import ProductForm from "./components/form"
import api from "@/services/api";

export default async function Product() {
    const token = await getCookieServer();
    const category = await api.get('/category', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return (
        <ProductForm categories={category.data} />
    )
}