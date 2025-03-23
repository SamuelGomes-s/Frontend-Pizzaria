'use client'
import { getCookieCliente } from "@/lib/cookiesClient";
import api from "@/services/api";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { toast } from "sonner";

export interface OrderDeailProps {
  id: string,
  amount: number,
  order: {
    id: string,
    name: string | null,
    table: number
  },
  productId: string,
  product: {
    id: string,
    name: string,
    price: string,
    banner: string,
    categoryId: string,
    description: string
  },

}

type OrderProvicerProps = {
  children: ReactNode
}

type OrderContextData = {
  isOpen: boolean,
  handleRequestOpen: (orderId: string) => Promise<void>,
  handleRequestClose: () => void,
  order: OrderDeailProps[],
  finishOrder: (orderId: string) => Promise<void>
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProvicerProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState<OrderDeailProps[]>([])
  const router = useRouter()

  async function handleRequestOpen(orderId: string) {
    try {
      const token = await getCookieCliente()
      const response = await api.get("/order/detail", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          orderId: orderId
        }
      })
      setOrder(response.data)
      setIsOpen(true)
    } catch (error) {
      console.log(error)
    }
  }

  function handleRequestClose() {
    setIsOpen(false)
  }


  async function finishOrder(orderId: string) {
    try {
      const token = await getCookieCliente()
      await api.put("/order/finish", {
        orderId: orderId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      toast.success("Pedido finalizado com sucesso!")
      setIsOpen(false)
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <OrderContext.Provider value={{ isOpen, handleRequestOpen, handleRequestClose, order, finishOrder }}>
      {children}
    </OrderContext.Provider>
  )
}