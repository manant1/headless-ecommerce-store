import * as React from "react"
import Layout from "../components/layout"
import axios from "axios"
import { Link, navigate } from "gatsby"
import { useToastState } from "../toast.context"
import { ToastTypes } from "../shared/enum/toast-types"
import AuthService  from "../utils/services/auth.service"

const authService = new AuthService()

const SignUp: React.FC = () => {
  if (authService.isLoggedIn()) {
    navigate("/products")
  }

  const { showToast } = useToastState()

  interface SignUpData {
    email: string;
    password: string;
  }

  const [submitted, setSubmit] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false)
  const [formData, setFormData] = React.useState<SignUpData>({
    email: "",
    password: ""
  })

  const submit = (event) => {
    event.preventDefault();
    setLoading(true)
    setSubmit(true);
    if (formData.email && formData.password && !loading) {
      authService.signUp(formData).then(() => {
        navigate("/sign-in")
      }).catch((err: any) => {
        showToast({
          type: ToastTypes.DANGER,
          message: err.response?.data?.message || "Unexpected error"
        })
        setLoading(false)
      })
    }
  }

  return <Layout title={"Headless ecommerce store sign up"} description={"You can sign up to track your orders"}>
    <div className={"section"}>
      <h1 className={"text-3xl font-bold mt-3 mb-3"}>Sign up</h1>
      <div className="w-full">
        <form onSubmit={($event) => submit($event)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username"> Email </label> <input onChange={($event) => setFormData({
            ...formData,
            email: $event.target.value
          })}
                                                                                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                                                                    id="username" type="email"/>
            {(submitted && !formData.email) && <p className="text-red-500 text-xs italic">Please enter an email.</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password"> Password </label> <input onChange={($event) => setFormData({
            ...formData,
            password: $event.target.value
          })}
                                                                                                                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                                                                                       id="password" type="password"/>
            {(submitted && !formData.password) && <p className="text-red-500 text-xs italic">Please enter a password.</p>}
          </div>
          <div className="flex items-center justify-between">
            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  to={"/sign-in"}> Sign In</Link>
            <button disabled={loading}
              className="bg-transparent text-black font-semibold py-2 px-4 border border-black hover:border-transparent rounded"
              type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </Layout>
}

export default SignUp
