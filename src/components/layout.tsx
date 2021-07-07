import * as React from "react"
import Header from "./header"
import Seo from "./seo"
import Footer from "./footer"
import ToastProvider from "../toast.context"

interface LayoutProps {
  children: object;
  title?: string;
  lang?: string;
  meta?: { name: string, content: string }[];
  description?: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <Seo title={props.title || "Headless ecommerce store"} lang={"en"} meta={props.meta || []}
           description={props.description || "Ecommerce store build with Gatsby.Js, Tailwind and Stripe"}/> <Header/>
      <div>
        <main>{props.children}</main>
        <Footer/>
      </div>
    </>
  )
}

export default Layout
