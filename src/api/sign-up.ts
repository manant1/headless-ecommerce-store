import axios from "axios"

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.status(404).json({
      message: `${req.method} /sign-up not found`
    })
    return;
  }

  if (!req.body.email && !req.body.password) {
    res.status(500).json({message: "Missing required fields email and password"});
  }

  try {
    await axios.post(`${process.env.GATSBY_NETLIFY_IDENTITY_URL}/signup`, {
      email: req.body.email,
      password: req.body.password
    })
    res.status(200).json()
  }
  catch (e) {
    res.status(500).json({message: e.response.data.msg || "Unexpected error occurred."});
  }
}

export default handler
