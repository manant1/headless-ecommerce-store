import CartItem from "../../shared/models/cart-item"
import axios from "axios"
import LocalStorageService from "./local-storage.service"
import AuthService from "./auth.service"
import User from "../../shared/models/user"

const localStorageService = new LocalStorageService()
const authService = new AuthService()

export default class StripeService {
  createCheckoutSession = (products: { [productId: string]: CartItem }, user: User = null): Promise<string> => {
    return axios.post(`/api/create-checkout-session`, {
      products: products,
      user: user
    }).then((response: any) => {
      return response.data.url
    })
  }

  getAccountOrders = async () => {
    const token: string = await authService.refreshToken()
    if (!token) {
      authService.logOut()
      return []
    }
    return axios.post("/api/orders", {
      token: token
    }).then((response: any) => response.data).catch((err: any) => {
      if (err.response.status === 401) {
        authService.logOut()
      }
    })
  }
}