import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { HiShoppingCart } from "react-icons/hi"
import { Link } from "gatsby"
import { connect } from "react-redux"
import { AppState } from "../state/create-store"
import AuthService from "../utils/services/auth.service"
import { clearCart } from "../state/actions/cart"

const authService = new AuthService()

const linkStyle = "h-full hover:bg-gray-100 pl-3 pr-3 w-full text-center"

interface HeaderProps {
  qty: number;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState<boolean>(false)

  const isActive = (path: string): boolean => {
    if (typeof window !== "undefined") {
      return path === window.location.pathname
    }
    return false
  }

  const logOut = (event) => {
    event.preventDefault()
    props.dispatch(clearCart())
    authService.logOut();
  }

  return (
    <header
      className={`bg-white shadow-md mb-6`}
      style={{ height: 75 }}
    >
      <div className="section h-full w-full grid grid-cols-2">
        <div className="relative h-full w-full">
          <Link to="/products"> <StaticImage
            src="../images/logo.jpg"
            quality={95}
            imgStyle={{ objectFit: "contain" }}
            formats={["AUTO", "WEBP"]}
            alt="Website logo"
            className="absolute top-1/2 transform -translate-y-1/2"
          /> </Link>
        </div>
        {/* Desktop Menu */}
        <div className="md:grid md:grid-cols-3 md:h-full hidden">
          {authService.isLoggedIn() && (
            <React.Fragment> <Link to={"/my-account"}>
              <button className={linkStyle + ` ${isActive("/my-account") ? "bg-gray-100" : ""}`}>My Account</button>
            </Link> <a href="#" onClick={($event) => logOut($event)}>
              <button className={linkStyle}>Log Out</button>
            </a> </React.Fragment>
          )}
          {!authService.isLoggedIn() && (
            <React.Fragment> <Link to={"/sign-up"}>
              <button className={linkStyle + ` ${isActive("/sign-up") ? "bg-gray-100" : ""}`}>Sign Up</button>
            </Link> <Link to={"/sign-in"}>
              <button className={linkStyle + ` ${isActive("/sign-in") ? "bg-gray-100" : ""}`}>Sign In</button>
            </Link> </React.Fragment>
          )} <Link to={"/cart"}>
          <button className={linkStyle + ` ${isActive("/cart") ? "bg-gray-100" : ""}`}><HiShoppingCart
            className={"inline"}
          /> Cart ({props.qty})
          </button>
        </Link>
        </div>
        {/*  Mobile Menu */}
        <div
          className={`w-full h-full left-0 bg-white fixed md:hidden transition-transform duration-200 ease-in-out`}
          style={{ zIndex: 100, transform: `translateY(${mobileMenuOpen ? "0" : "-100%"})` }}
        >
          <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
            <div className={`w-full text-2xl font-bold mb-6 ${isActive("/products") ? "text-blue-500" : ""}`}>
              <Link to={"/products"}>Home</Link>
            </div>
            <div className={`w-full text-2xl font-bold mb-6 ${isActive("/cart") ? "text-blue-500" : ""}`}>
              <Link to={"/cart"}><HiShoppingCart className={"inline"}/> Cart ({props.qty})</Link>
            </div>
            <div className={`w-full text-2xl font-bold mb-6 ${isActive("/sign-in") ? "text-blue-500" : ""}`}>
              <Link to={"/sign-in"}>Sign In</Link>
            </div>
            <div className={`w-full text-2xl font-bold mb-6 ${isActive("/sign-up") ? "text-blue-500" : ""}`}>
              <Link to={"/sign-up"}>Sign Up</Link>
            </div>
          </div>
        </div>
        <div
          className="relative md:hidden"
          style={{ height: 75, zIndex: 9999 }}
        >
          <button
            className={`text-gray-500 w-10 h-10 absolute top-1/2 right-0 transform -translate-y-1/2 focus:outline-none bg-white float-right`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="block w-5 absolute left-1/2 top-1/2 transform  -translate-x-1/2 -translate-y-1/2">
                  <span
                    aria-hidden="true"
                    className={`block absolute h-0.5 w-5 bg-gray-600 transform transition duration-500 ease-in-out ${mobileMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
                  /> <span
              aria-hidden="true"
              className={`block absolute  h-0.5 w-5 bg-gray-600 transform transition duration-500 ease-in-out ${mobileMenuOpen ? "opacity-0" : ""}`}
            /> <span
              aria-hidden="true"
              className={`block absolute  h-0.5 w-5 bg-gray-600 transform  transition duration-500 ease-in-out  ${mobileMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
            />
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default connect((state: AppState) => ({
  qty: state.cart.qty
}), null)(Header)
