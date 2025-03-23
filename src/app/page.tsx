import Image from "next/image";
import styles from "./page.module.scss";
import logo from "../../public/logo.svg"
import Link from "next/link";
import api from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Home() {

  async function handleLogin(formData: FormData) {
    "use server"
    const email = formData.get("email")
    const password = formData.get("password")
    if (email === "" || password === "") {
      return
    }
    try {
      const response = await api.post('/session', {
        email: email,
        password: password
      })
      if (!response.data.token) {
        return
      }
      const expressTime = 60 * 60 * 24 * 30 * 1000
      const cookieStore = await cookies();
      cookieStore.set('session', response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production'
      })
    } catch (error) {
      console.log("Error")
      console.log(error)
    }
    redirect("/dashboard")
  }

  return (
    <>
      <main className={styles.centerContainer}>
        <Image
          src={logo}
          alt="Foto da logo do site."
        />
        <section className={styles.formContainer}>
          <form action={handleLogin}>
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
              Acessar
            </button>
          </form>
        </section>
        <Link href={'/signup'} className={styles.linkR}>
          Não possui uma conta? Registre aqui
        </Link>
      </main>
    </>
  );
}
