import * as React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const CheckoutSuccessPage: React.FC = () => {
  return <Layout>
    <div className="section p-6">
      <h1 className={"text-center text-3xl font-bold mb-3"}>Order was paid successfully!</h1>
      <p className={"text-center mb-3"}>Order details will be sent to your email.</p>
      <div className={"w-full text-center"}>
        <Link to={"/products"}>
          <button
            className="bg-transparent text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">
            Got To Main Page
          </button>
        </Link>
      </div>
    </div>
  </Layout>
}

export default CheckoutSuccessPage
