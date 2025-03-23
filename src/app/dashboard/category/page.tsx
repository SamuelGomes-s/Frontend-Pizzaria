import api from "@/services/api"
import ButtonStyled from "../components/button"
import styles from "./styles.module.scss"
import { getCookieServer } from "@/lib/cookiesServer"
import { redirect } from "next/navigation"

export default function Category() {

    async function handleRegisterCategory(formData: FormData) {
        "use server"
        const category = formData.get("category")
        if (category === "") {
            return
        }
        try {
            const token = await getCookieServer()
            if (!token) {
                return
            }
            await api.post('/category', {
                name: category
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log("Error")
            console.log(error)
            return
        }
        redirect("/dashboard")
    }

    return (
        <main className={styles.categoryContainer}>
            <div className={styles.categoryContent}>
                <h1>Nova categoria</h1>
                <form action={handleRegisterCategory}>
                    <input
                        className={styles.input}
                        type="text"
                        name="category"
                        placeholder="Digite o nome para a categoria"
                    />
                    <ButtonStyled name="Cadastrar" />
                </form>
            </div>
        </main>
    )
}