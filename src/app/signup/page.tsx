import Image from "next/image"
import styles from "../page.module.scss"
import logo from "../../../public/logo.svg"
import Link from "next/link"
import api from "@/services/api"
import { redirect } from "next/navigation"

export default function Signup() {

    async function handleRegister(formData: FormData) {
        "use server"
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        if (name === "" || email === "" || password === "") {
            console.log('Prencha todos os campos.')
            return
        }
        try {
            await api.post("/users", {
                name: name,
                email: email,
                password: password
            })
        } catch (error) {
            console.log("Error")
            console.log(error)
        }
        redirect('/')
    }

    return (
        <main className={styles.centerContainer}>
            <Image
                src={logo}
                alt="Logo do site pizza."
            />
            <section className={styles.formContainer}>
                <h1> Criando sua conta</h1>
                <form action={handleRegister}>
                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        required
                        placeholder="Digite seu nome..."
                    />
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        required
                        placeholder="Digite seu email..."
                    />
                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        required
                        placeholder="*********"
                    />
                    <button
                        className={styles.button}
                    >
                        Cadastrar
                    </button>
                </form>
            </section>
            <Link href={'/'} className={styles.linkR}>
                Já possui uma conta? Entre aqui
            </Link>
        </main>
    )
}