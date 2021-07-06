import * as React from "react"
import { Link } from "gatsby"

const Footer: React.FC = () => {
  return <footer className="mt-6">
    <hr />
    <div className="section grid grid-cols-1 sm:grid-cols-3 w-full pt-6 pb-6">
      <div>
        <p className="font-bold mb-3">About</p>
        <ul className="list-none p-0">
          <li className="mb-3">
            <Link to={"/privacy"}>
              <span className="text-blue-500 pointer">Privacy</span>
            </Link>
          </li>
          <li className="mb-3">
            <Link to={"/terms"}>
              <span className="text-blue-500 pointer">Terms</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-bold mb-3">Services</p>
        <ul className="list-none p-0">
          <li className="mb-3">
            <Link to={"/products"}>
              <span className="text-blue-500 pointer">Products</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="font-bold mb-3">Headless ecommerce store</p>
        <p className="text-justify text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
    </div>
  </footer>
}

export default Footer