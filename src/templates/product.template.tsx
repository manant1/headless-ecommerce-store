import * as React from "react"
import Price from "../shared/models/price"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { getPrice } from "../utils/helper"
import Currency from "../components/currency"
import QuantitySelector from "../components/quantity-selector"
import { HiShoppingCart } from "react-icons/hi"

interface ProductsTemplateProps {
  pageContext: {
    price: Price
  }
}

const ProductTemplate = (props) => {
  const defaultQty = 1
  const [qty, setQuantity] = React.useState(defaultQty);

  const price: Price = props.pageContext.price;
  return <Layout title={`Product - ${price.product.name}`} description={price.product.description}>
    <div className="section">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 h-full">
        <div style={{maxHeight: 350, overflow: "hidden"}}>
          <GatsbyImage imgStyle={{ objectFit: "fill", width: "100%", maxHeight: 350, margin: "0 auto"}}
                       alt={"product photo"} image={price.product.image.childImageSharp.gatsbyImageData}/>
        </div>
        <div className="relative">
          <div className="sm:absolute sm:top-1/2 w-full sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
            <h1 className={"font-bold text-md mb-3"}>{price.product.name}</h1>
            <p className="mb-3">{getPrice(price.amount)}&nbsp;<Currency code={price.currency}/></p>
            <div className="bg-gray-200 rounded mb-3" style={{width: "fit-content"}}>
              <p className="p-1.5 text-xs" style={{width: "fit-content"}}>SKU: {price.product.id}</p>
            </div>
            <QuantitySelector className={"mb-3 w-full"} defaultQty={defaultQty} quantityChanged={setQuantity}/>
            <button
              className="w-full bg-transparent hover:bg-gray-200 text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">
              <HiShoppingCart className={"inline"}/> Add to cart
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className={"font-bold text-md"}>
          Product description
        </p>
        <p className={"text-justify"}>
          {price.product.description}
        </p>
        <hr className="w-full mt-3 mb-3"/>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-color-grey border rounded">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      colSpan={2}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Attributes
                    </th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(price.product.metadata).map((key: string) => (
                    <tr key={key}>
                      <td className="px-6 py-4 whitespace-nowrap border-r border-color-grey">
                        <div className="text-sm text-gray-900">{key}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{price.product.metadata[key] || "-"}</div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
}

export default ProductTemplate