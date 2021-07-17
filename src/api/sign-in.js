import axios from "axios"

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({
      message: `${req.method} /sing-in not found`
    })
    return
  }

  if (!req.body.email && !req.body.password) {
    res.status(500).json({ message: "Missing required fields email and password" })
  }

  try {
    const { data } = await axios.post(`${process.env.GATSBY_NETLIFY_IDENTITY_URL}/token?grant_type=password&username=${req.body.email}&password=${req.body.password}`, {
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).json(data)
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.response ? e.response.data.error_description : "Unexpected error occurred" })
  }
}

export default handler
