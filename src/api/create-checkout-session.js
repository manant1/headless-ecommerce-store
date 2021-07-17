const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({
      message: `${req.method} /create-checkout-session not found`
    })
    return
  }

  if (!req.body.products) {
    res.status(500).json({ message: "Missing field: products" })
  }

  let session = null
  try {
    const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK)
    let sessionConfig = {
      success_url: process.env.GATSBY_STRIPE_CHECKOUT_SUCCESS_URL,
      cancel_url: process.env.GATSBY_STRIPE_CHECKOUT_CANCEL_URL,
      payment_method_types: ["card"],
      line_items: getLineItems(req.body.products),
      mode: "payment",
      billing_address_collection: "required"
    }
    if (req.body.user && req.body.user.email) {
      sessionConfig["customer_email"] = req.body.user.email
    }
    session = await stripe.checkout.sessions.create(sessionConfig)
    res.status(200).json({
      url: session.url
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const getLineItems = (cartItems) => {
  return Object.keys(cartItems).map((key) => ({
    price: cartItems[key].priceId,
    quantity: cartItems[key].qty
  }))
}

export default handler
