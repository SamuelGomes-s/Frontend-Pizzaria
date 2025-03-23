import { OrderDeailProps } from "@/providers/order";

export function calculateTotalOrder(order: OrderDeailProps[]) {
  return order.reduce((total, item) => {
    const itemTotal = parseFloat(item.product.price) * item.amount;
    return total + itemTotal;
  }, 0);
}
