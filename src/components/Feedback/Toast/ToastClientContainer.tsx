import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ToastClientContainer() {
  return (
    <ToastContainer
      position="top-center"
      theme="light"
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
      className={"w-full max-w-[600px] top-0 z-50"}
      autoClose={3000}
    />
  )
}
