import * as React from "react"
import { CartState } from "../state/reducers/cart"
import { AppState } from "../state/create-store"
import { connect } from "react-redux"
import Layout from "../components/layout"
import CartItem from "../shared/models/cart-item"
import { GatsbyImage } from "gatsby-plugin-image"
import Currency from "../components/currency"
import { getPrice } from "../utils/helper"
import QuantitySelector from "../components/quantity-selector"
import { addToCart, removeCartItem } from "../state/actions/cart"
import { useToastState } from "../toast.context"
import { ToastTypes } from "../shared/enum/toast-types"
import { createCheckoutSession } from "../utils/services/stripe.service"

interface CartProps {
  cart: CartState,
  dispatch: any
}

interface CartProductsProps {
  products: {
    [productId: string]: CartItem
  },
  qty: number,
  dispatch: any
}

const CartProducts: React.FC<CartProductsProps> = (props) => {
  if (props.qty === 0) {
    return <p>Cart is empty</p>
  }

  const quantityChanged = (cartItem: CartItem, qty: number) => {
    props.dispatch(addToCart({
      ...cartItem,
      qty: qty - cartItem.qty
    }))
  }

  return <React.Fragment>
    {
      Object.keys(props.products).map((productId: string) => {
        const cartItem: CartItem = props.products[productId]

        return (
          <div key={productId} className="flex">
            <div className="w-2/6 overflow-hidden" style={{ height: 150 }}>
              <GatsbyImage alt={"cart item photo"} imgStyle={{ height: 150, objectFit: "contain" }}
                           image={cartItem.image.childImageSharp.gatsbyImageData}/>
            </div>
            <div className="w-4/6">
              <span className="flex font-bold text-sm">{cartItem.name}</span> <span
              className="flex text-center font-semibold text-sm">{cartItem.price} <Currency
              code={cartItem.currency}/> x {cartItem.qty}</span>
              <button onClick={() => props.dispatch(removeCartItem(cartItem.productId))}
                      className="w-full text-left mt-3 mb-3 font-semibold hover:text-red-500 text-gray-500 text-xs">Remove
              </button>
              <QuantitySelector quantityChanged={quantityChanged.bind(this, cartItem)} defaultQty={cartItem.qty}/>
            </div>
          </div>
        )
      })
    }
  </React.Fragment>
}

const Cart: React.FC<CartProps> = (props) => {
  const { showToast } = useToastState()
  const checkout = () => {
    createCheckoutSession(props.cart.products).then((url: string) => {
      typeof window !== "undefined" && window.open(url, "_self")
    }).catch(() => {
      showToast({
        type: ToastTypes.DANGER,
        message: "Error trying to invoke stripe checkout."
      })
    })

  }

  return <Layout>
    <div className="section">
      <div className="container mx-auto mt-10">
        <div className="flex md:shadow-md md:rounded-md my-10">
          <div className="w-full bg-white px-3 py-3">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{props.cart.qty} Items</h2>
            </div>
            <div className="flex m-3">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
            </div>
            <CartProducts dispatch={props.dispatch} qty={props.cart.qty} products={props.cart.products}/>
            <div className="flex justify-between border-t pt-3">
              <span className="text-xl font-bold text-left justify-center"
                    style={{ lineHeight: "45px" }}>Subtotal: {getPrice(props.cart.sum * 100)} <Currency
                code={props.cart.currency}/></span>
              <button onClick={() => checkout()}
                      className="bg-transparent text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
}

export default connect((state: AppState) => ({
  cart: state.cart
}))(Cart)