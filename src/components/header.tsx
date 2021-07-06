import * as React from "react"
import { Link } from "gatsby"

interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = (props) => (
  <header
    className="bg-white"
  >
    <div
      className="ml-24 mr-24 sm:ml-3 sm:mr-3"
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {props.siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

export default Header
