export default interface CartItem {
    priceId: string;
    productId: string;
    price: number;
    currency: string;
    qty: number;
    name: string;
    image: {
        childImageSharp: {
            gatsbyImageData: any
        }
    }
}