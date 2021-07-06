import CartItem from "../../shared/models/cart-item"

export const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_CART_ITEM: 'REMOVE_CART_ITEM'
};

export const addToCart = (cartItem: CartItem) => ({type: actionTypes.ADD_TO_CART, cartItem});
export const removeCartItem = (productId: string) => ({type: actionTypes.REMOVE_CART_ITEM, productId})