import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import {HiShoppingCart} from "react-icons/hi"
import { Link } from "gatsby"

const linkStyle = "h-full hover:bg-gray-100 pl-3 pr-3"

const Header: React.FC = () => (
  <header
    className="bg-white shadow-md mb-6"
    style={{height: 75}}
  >
    <div
      className="section h-full w-full grid grid-cols-2"
    >
      <div className="relative h-full w-full">
        <Link to="/products">
          <StaticImage
            src="../images/logo.jpg"
            quality={95}
            imgStyle={{objectFit: "contain"}}
            formats={["AUTO", "WEBP"]}
            alt="Website logo"
            className="absolute top-1/2 transform -translate-y-1/2"
          />
        </Link>
      </div>
      <div className="grid grid-cols-3 h-full">
        <button className={linkStyle}>Sign Up</button>
        <button className={linkStyle}>Sign In</button>
        <button className={linkStyle}><HiShoppingCart className={"inline"}/> Cart ({0})</button>
      </div>
    </div>
  </header>
)

export default Header
