import CartItem from "../../shared/models/cart-item"
import axios from "axios"

export const createCheckoutSession = (products: {[productId: string]: CartItem}): Promise<string> => {
  return axios.post(`/api/create-checkout-session`, {
    products: products
  }).then((response: any) => {
    return response.data.url;
  });
}