import * as React from "react"
import Layout from "../components/layout"
import { Link, navigate } from "gatsby"
import AuthService from "../utils/services/auth.service"
import StripeService from "../utils/services/stripe.service"

const authService = new AuthService()
const stripeService = new StripeService()

const MyAccount: React.FC = () => {
  if (!authService.isLoggedIn()) {
    navigate("/products")
    return null
  }
  const [orders, setOrders] = React.useState([])

  React.useEffect(() => {
    stripeService.getAccountOrders().then((orders: any) => setOrders(orders))
  }, []);

  return <Layout>
    <div className="section my-3">
      <h1 className="font-bold text-3xl">
      </h1>
      {(!orders || orders.length === 0) && <React.Fragment>
        <p className="text-xl font-bold text-center">No recent orders.</p>
        <p className="text-md text-center">When you place an order under this account, they will appear here. <Link className="text-blue-500 pointer" to={"/products"}>Shop Now</Link>.</p>
      </React.Fragment>}
      {(orders && orders.length > 0) && <React.Fragment>

      </React.Fragment>}
    </div>
  </Layout>
}

export default MyAccount