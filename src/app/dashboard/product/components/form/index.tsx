"use client"
import ButtonStyled from "@/app/dashboard/components/button"
import styles from "./styles.module.scss"
import { UploadIcon } from "lucide-react"
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { getCookieCliente } from "@/lib/cookiesClient"
import api from "@/services/api"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CategoryProps {
    id: string,
    name: string
}

interface Props {
    categories: CategoryProps[]
}

export default function ProductForm({ categories }: Props) {
    const router = useRouter()
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState('')
    async function handleRegisterProduct(formData: FormData) {
        const name = formData.get("name")
        const description = formData.get("description")
        const price = formData.get("price")
        const categoryIndex = formData.get("category")
        if (!name || !categoryIndex || !description || !price || !image) {
            toast.warning('Preencha todos os campos..')
            return
        }
        try {
            const token = await getCookieCliente()
            const category = categories[Number(categoryIndex)]
            const data = new FormData()
            data.append("name", name)
            data.append("categoryId", category.id)
            data.append("description", description)
            data.append("file", image)
            data.append("price", price)
            await api.post("/product", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success("Produto cadastrado com sucesso!")
            router.push("/dashboard")
        } catch (error) {
            toast.error('Erro ao cadastrar o produto!')
            // console.log(error)
        }
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type !== 'image/png' && image.type !== 'image/jpeg') {
                toast.warning("Formato de imagem proibido")
                // console.log("Formato de imagem proibido")
                return
            }
            setImage(image)
            setPreviewImage(URL.createObjectURL(image))
        }
    }

    return (
        <main className={styles.productContainer}>
            <h1>Novo produto</h1>
            <form action={handleRegisterProduct}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadIcon size={30} color={"#FFF"} />
                    </span>
                    <input
                        className={styles.file}
                        accept="image/png, image/jpeg"
                        type="file"
                        required
                        onChange={handleFile}
                    />
                    {previewImage && (
                        <Image
                            alt="Preview da imagem"
                            src={previewImage}
                            className={styles.preview}
                            priority={true}
                            fill={true}
                            quality={100}
                        />
                    )}
                </label>
                <select name="category"  >
                    {categories.map((item, index) => (<option key={item.id} value={index}>{item.name}</option>))}
                </select>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    placeholder="Nome do item..."
                    required
                />
                <input
                    className={styles.input}
                    type="text"
                    name="price"
                    placeholder="Preço do produto..."
                    required
                />
                <textarea className={styles.input} placeholder="Descrição do produto..." name="description"></textarea>
                <ButtonStyled name="Cadastrar" />
            </form>
        </main>
    )
}