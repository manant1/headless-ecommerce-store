import * as React from "react"
import Toast from "./components/toast"

export const ToastContext = React.createContext({})

export const useToastState = (): any => {
  return React.useContext(ToastContext)
}

export default ({ children }) => {
  const [toastList, setToasts] = React.useState([])

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        removeToast(toastList[0].id);
      }
    }, 1500);
    return () => {
      clearInterval(interval);
    }
  }, [toastList])

  const showToast = (toast: { type: string, message: string }) => {
    const id: number = new Date().getTime();
    const toasts: any[] = [...toastList]
    toasts.push({
      id: id,
      ...toast
    })
    setToasts(toasts)
  }

  const removeToast = (id: number) => {
    const toasts: any[] = toastList.filter((t) => t.id !== id)
    setToasts(toasts)
  }

  return <ToastContext.Provider value={{ showToast: showToast }}>
    <div className={"absolute top-0 right-0 m-6"} style={{ minWidth: 130, maxWidth: "90%" }}>
      {toastList.slice(0, 5).map((t: any, i: number) => (
        <Toast type={t.type} message={t.message} key={i}/>
      ))}
    </div>
    {children}
  </ToastContext.Provider>
};