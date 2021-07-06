export default interface Product {
  id: string,
  name: string,
  description: string,
  metadata: {
    height: string,
    width: string,
    material: string
  },
  image: {
    childImageSharp: {
      gatsbyImageData: any
    }
  }
}