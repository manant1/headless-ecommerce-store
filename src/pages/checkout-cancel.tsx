import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const CheckoutCancelPage: React.FC = () => {
  return <Layout>
    <h1 className={"text-center text-3xl font-bold mb-3"}>Order was cancelled!</h1>
    <p className={"text-center mb-3"}>You can try to pay again later. <Link className="text-blue-500 pointer" to={"/cart"}>Go To Cart</Link></p>
    <div className={"w-full text-center"}>
      <Link to={"/products"}>
        <button
          className="bg-transparent text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">
          Got To Main Page
        </button>
      </Link>
    </div>
  </Layout>
}

export default CheckoutCancelPage
