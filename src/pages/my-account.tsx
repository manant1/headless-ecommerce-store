import * as React from "react"
import Layout from "../components/layout"
import { Link, navigate } from "gatsby"
import AuthService from "../utils/services/auth.service"
import StripeService from "../utils/services/stripe.service"
import { getPrice } from "../utils/helper"
import Currency from "../components/currency"
import {FaFileInvoice} from "react-icons/fa"

const authService = new AuthService()
const stripeService = new StripeService()

const MyAccount: React.FC = () => {
  if (!authService.isLoggedIn()) {
    navigate("/products")
    return null
  }
  const [orders, setOrders] = React.useState(null)

  React.useEffect(() => {
    stripeService.getAccountOrders().then((response: any) => setOrders(response.orders))
  }, []);

  return <Layout>
    <div className="section my-3">
      <h1 className="font-bold text-2xl mb-3">
        Orders
      </h1>
      {(orders !== null && orders.length === 0) && <React.Fragment>
        <p className="text-xl font-bold text-center">No recent orders.</p>
        <p className="text-md text-center">When you place an order under this account, they will appear here. <Link className="text-blue-500 pointer" to={"/products"}>Shop Now</Link>.</p>
      </React.Fragment>}
      {(orders && orders.length > 0) && <React.Fragment>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-color-grey border rounded">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Receipt
                    </th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-color-grey">
                        <div className="text-sm text-gray-900">{getPrice(order.amount)}&nbsp;<Currency code={order.currency}/></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-color-grey">
                        <div className="text-sm text-gray-900">{order.isPaid ? "payed" : "unpaid"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-color-grey">
                        <div className="text-sm text-gray-900">
                          <a href={order.receiptUrl} target="_blank" className="cursor text-blue-500">
                            <FaFileInvoice className={"inline"}/> Receipt
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>}
    </div>
  </Layout>
}

export default MyAccount