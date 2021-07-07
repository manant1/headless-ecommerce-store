import axios from "axios"

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({
      message: "GET /sing-in not found"
    })
    return;
  }

  if (!req.body.email && !req.body.password) {
    res.status(500).json({message: "Missing required fields email and password"});
  }

  try {
    await axios.post(`${process.env.NETLIFY_IDENTITY_URL}/token`, {
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).json()
  }
  catch (e) {
    res.status(500).json({message: e.message});
  }
}

export default handler
