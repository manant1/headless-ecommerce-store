const { createRemoteFileNode } = require("gatsby-source-filesystem")
const path = require(`path`)


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const productsTemplate = path.resolve(`src/templates/products.template.tsx`)
  const productTemplate = path.resolve(`src/templates/product.template.tsx`)

  return graphql(`
    {
      allStripePrice(
        limit: 1000
        filter: {active: {eq: true}, product: {active: {eq: true}}}
      ) {
        edges {
          node {
            id
            currency
            amount: unit_amount
            product {
              id
              name
              description
              metadata {
                height
                width
                material
              }
              image {
                childImageSharp {
                  gatsbyImageData(
                    width: 350
                    placeholder: BLURRED
                    formats: [AUTO, WEBP, AVIF]
                  )
                }
              }
            }
          }
        }
      }
    }
  `, { limit: 1000 }).then(result => {
    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query.`)
      return
    }

    // Create products pages
    const productsPerPage = 5
    const prices = result.data.allStripePrice.edges
    const numberOfPages = Math.ceil(prices.length / productsPerPage)

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? '/products' : `/products/${i + 1}`,
        component: productsTemplate,
        context: {
          limit: productsPerPage,
          skip: i * productsPerPage,
          numberOfPages: numberOfPages,
          currentPage: i + 1,
          hasNext: i + 1 < numberOfPages,
          hasPrev: i !== 0
        }
      })
    })

    //Create product pages
    prices.forEach(({node}) => {
      createPage({
        path: `/product/${node.product.id}/${node.product.name.split(" ").join('-').toLowerCase()}`,
        component: productTemplate,
        context: {
          price: {
            ...node
          }
        }
      })
    })
  })
}

exports.onCreateNode = async ({ node, actions, store, cache }) => {
  if (!node.product || node.product.object !== "product") {
    return
  }
  const { createNode } = actions
  const fileNode = await createRemoteFileNode({
    url: node.product.images[0],
    store,
    cache,
    createNode,
    createNodeId: id => `stripe-product-image-sharp-${id}`
  })

  if (fileNode) {
    node.product.image___NODE = fileNode.id
  }
}