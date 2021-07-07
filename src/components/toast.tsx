import * as React from "react"
import { HiCheckCircle, HiInformationCircle, HiXCircle } from "react-icons/hi"
import { ToastTypes } from "../shared/enum/toast-types"

interface ToastProps {
  type: string,
  message: string
}

const Toast: React.FC<ToastProps> = (props) => {
  return (
    <React.Fragment>
      <div
        className={`flex items-center border-l-4 py-2 px-3 shadow-md mb-2 ${props.type === ToastTypes.SUCCESS ? "bg-green-500 border-green-700" : ""} 
    ${props.type === ToastTypes.INFO ? "bg-blue-500 border-blue-700" : ""} ${props.type === ToastTypes.DANGER ? "bg-red-500 border-red-700" : ""}`}>
        <div className={`rounded-full bg-white mr-3 ${props.type === ToastTypes.SUCCESS ? "text-green-500" : ""} 
    ${props.type === ToastTypes.INFO ? "text-blue-500" : ""} ${props.type === ToastTypes.DANGER ? "text-red-500" : ""}`}>
          {props.type === ToastTypes.SUCCESS && <HiCheckCircle/>} {props.type === ToastTypes.INFO &&
        <HiInformationCircle/>} {props.type === ToastTypes.DANGER && <HiXCircle/>}
        </div>
        <div className="text-white max-w-xs ">
          {props.message}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Toast