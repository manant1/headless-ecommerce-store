import * as React from "react"

interface CurrencyProps {
  code: string
}

const Currency: React.FC<CurrencyProps> = (props) => {
  if (props.code.toLowerCase() === "usd") {
    return <>&dollar;</>
  }

  return <>&euro;</>
}

export default Currency