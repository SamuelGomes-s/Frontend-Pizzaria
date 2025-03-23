"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss"
import logoImg from "/public/logo.svg"
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {
    const router = useRouter();
    async function handleLogOut() {
        deleteCookie("session", { path: "/" })
        toast.success("LogOut concluido.")
        router.replace("/")
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href={"/dashboard"}>
                    <Image
                        alt="Logo do site pizza."
                        src={logoImg}
                        width={190}
                        height={60}
                        quality={100}
                        priority
                    />
                </Link>
                <nav>
                    <Link href={"/dashboard/category"}>
                        Nova categoria
                    </Link>
                    <Link href={"/dashboard/product"}>
                        Produtos
                    </Link>
                    <form action={handleLogOut}>
                        <button type="submit">
                            <LogOutIcon size={24} color="#FFF" />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}