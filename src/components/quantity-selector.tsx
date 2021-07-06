import * as React from "react"

interface QuantitySelectorProps {
  quantityChanged: any,
  defaultQty: number,
  className?: string
}

const QuantitySelector: React.FC<QuantitySelectorProps> = (props) => {
  const [qty, setQuantity] = React.useState(props.defaultQty);

  const decreaseQuantity = () => {
    if (qty - 1 > 0) {
      setQuantity(qty - 1);
      props.quantityChanged(qty - 1);
    }
  }

  const increaseQuantity = () => {
    if (qty + 1 < 100) {
      setQuantity(qty + 1);
      props.quantityChanged(qty + 1);
    }
  }

  return (
    <div className={`custom-number-input h-10 w-32 ${props.className}`}>
      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button data-action="decrement" onClick={() => decreaseQuantity()}
                className=" bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input type="number" readOnly
               className="outline-none focus:outline-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
               name="custom-input-number" value={qty}/>
        <button data-action="increment" onClick={() => increaseQuantity()}
                className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  )
}

export default QuantitySelector