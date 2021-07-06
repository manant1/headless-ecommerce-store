import { actionTypes } from "../actions/cart"
import CartItem from "../../shared/models/cart-item"

export interface CartState {
  products: { [productId: string]: CartItem },
  sum: number,
  currency: string,
  qty: number
}

const initialState: CartState = {
  products: {},
  sum: 0,
  currency: null,
  qty: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const cartItem: CartItem = action.cartItem
      const updatedProducts = { ...state.products }
      if (updatedProducts[cartItem.productId]) {
        updatedProducts[cartItem.productId].qty += cartItem.qty
        return {
          sum: state.sum + (cartItem.price * cartItem.qty),
          qty: state.qty + cartItem.qty,
          currency: cartItem.currency,
          products: updatedProducts
        }
      }
      updatedProducts[cartItem.productId] = cartItem
      const { sum, qty, currency } = recalculateCartStatistics(updatedProducts)
      return {
        sum: sum,
        qty: qty,
        currency: currency,
        products: updatedProducts
      }
    }
    case actionTypes.REMOVE_CART_ITEM: {
      const updatedProducts = { ...state.products }
      delete updatedProducts[action.productId]
      const { sum, qty, currency } = recalculateCartStatistics(updatedProducts)
      return {
        sum: sum,
        qty: qty,
        currency: currency,
        products: updatedProducts
      }
    }
    default:
      return state
  }
};

const recalculateCartStatistics = (products: { [productId: string]: CartItem }) => {
  let sum: number = 0
  let qty: number = 0
  let currency: string = ""
  Object.keys(products).forEach((key: string) => {
    const cartItem: CartItem = products[key]
    sum += cartItem.price * cartItem.qty
    qty += cartItem.qty
    currency = cartItem.currency
  })
  return {
    sum: sum,
    qty: qty,
    currency: currency
  }
}