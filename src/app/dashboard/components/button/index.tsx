"use client"
import { useFormStatus } from "react-dom"
import styles from "./styles.module.scss"

interface ButtonProps {
    name: string
}
export default function ButtonStyled({ name }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button className={styles.button} disabled={pending} type="submit">
            {pending ? "Carregando" : name}
        </button>
    )
}