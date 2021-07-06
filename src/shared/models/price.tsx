import Product from "./product"

export default interface Price {
  id: string,
  currency: string,
  amount: number,
  product: Product
}