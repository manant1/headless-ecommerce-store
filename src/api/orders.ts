import axios from "axios"

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({
      message: `${req.method} /orders not found`
    })
    return;
  }

  if (!req.body.token) {
    res.status(500).json({message: "Missing required field token"});
  }

  let user;
  try {
    user = (await axios.get(`${process.env.GATSBY_NETLIFY_IDENTITY_URL}/user`, {
      headers: {
        "Authorization": `Bearer ${req.body.token}`
      }
    })).data;
  }
  catch(e) {
    res.status(401).json({message: "Unauthorized"})
    return
  }

  try {
    const stripe = require('stripe')(process.env.GATSBY_STRIPE_SK);
    const customers = await stripe.customers.list({
      limit: 1,
      email: user.email
    });
    if (customers.data.length === 0) {
      res.status(200).json({
        orders: []
      })
      return
    }
    const charges = await stripe.charges.list({
      limit: 100,
      customer: customers.data[0].id
    });
    res.status(200).json({
      orders: charges.data.map(c => ({
        isPaid: c.paid === true,
        receiptUrl: c.receipt_url,
        amount: c.amount,
        currency: c.currency
      }))
    })
  }
  catch (e) {
    res.status(500).json({message: e.response.data.error_description});
  }
}

export default handler
