import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Price from "../shared/models/price"
import { GatsbyImage } from "gatsby-plugin-image"
import { getPrice, getProductLink } from "../utils/helper"
import Currency from "../components/currency"

interface ProductsTemplateProps {
  data: {
    allStripePrice: {
      edges: {
        node: Price
      }[]
    }
  },
  pageContext: {
    limit: number,
    skip: number,
    numberOfPages: number,
    currentPage: number,
    hasNext: boolean,
    hasPrev: boolean
  }
}

const ProductsTemplate: React.FC<ProductsTemplateProps> = (props) => {
  const priceNodes: { node: Price }[] = props.data.allStripePrice.edges
  return <Layout>
    <div className="section grid grid-cols-1 sm:grid-cols-2 gap-12">
      {priceNodes.map(({ node }) => {
        return (
          <Link to={getProductLink(node.product.id, node.product.name)} key={node.id}>
            <div
              className="transition pointer transform hover:-translate-y-2 rounded-xl border-color-grey border shadow-md hover:shadow-lg border-radius-xl">
              <div className={"w-full h-4/5 overflow-hidden"} style={{ maxHeight: 350 }}>
                <GatsbyImage className={"rounded-xl"} imgStyle={{ objectFit: "contain", height: 350 }}
                             alt={"product photo"} image={node.product.image.childImageSharp.gatsbyImageData}/>
              </div>
              <hr className="w-full"/>
              <div className={"w-full h-1/5 p-3"}>
                <p className="font-bold text-lg overflow-hidden whitespace-nowrap	overflow-ellipsis overflow-hidden">
                  {node.product.name}
                </p>
                <p>{getPrice(node.amount)}&nbsp;<Currency code={node.currency}/></p>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
    <div className="text-center m-6">
      {props.pageContext.hasPrev && (
        <Link to={`/products/${props.pageContext.currentPage - 1 === 1 ? "" : props.pageContext.currentPage - 1}`}>
          <button
            className="bg-transparent text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">
            Previous
          </button>
        </Link>
      )} {props.pageContext.hasNext && (
      <Link to={`/products/${props.pageContext.currentPage + 1}`}>
        <button
          className="bg-transparent text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded">
          Next
        </button>
      </Link>
    )}
    </div>
  </Layout>
}

export default ProductsTemplate

export const productsQuery = graphql`
    query productsQuery($skip: Int!, $limit: Int!) {
        allStripePrice(
            filter: {active: {eq: true}, product: {active: {eq: true}}}
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    id
                    currency
                    amount: unit_amount
                    product {
                        id
                        name
                        metadata {
                            height
                            width
                            material
                        }
                        image {
                            childImageSharp {
                                gatsbyImageData(layout: CONSTRAINED)
                            }
                        }
                    }
                }
            }
        }
    }
`