export const getPrice = (amount: number): string => {
  return (amount / 100).toFixed(2);
}

export const getProductLink = (productId: string, name: string): string => {
  return `/product/${productId}/${name.split(" ").join("-").toLowerCase()}`
}