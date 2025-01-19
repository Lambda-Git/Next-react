import { ReactNode } from "react"
import Image from "next/image"
import closePng from "@/app/_assets/icons/close.png"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <div
      className={`z-10 w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 flex flex-col-reverse ${isOpen ? "visible" : "invisible"}`}
    >
      <div
        className={`bg-white p-4 rounded-t-xl text-white overflow-scroll relative transition-all`}
      >
        <div className=" absolute right-4 top-4">
          <Image
            src={closePng}
            alt="close"
            onClick={onClose}
            className="w-4 h-4 "
          />
        </div>
        {children}
      </div>
    </div>
  )
}
