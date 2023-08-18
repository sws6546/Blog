import Image from "next/image"

export default function NotFound() {
  return (
    <div className="m-auto text-center">
        <h1>404</h1>
        <Image 
            src="/talar.png"
            width={500}
            height={500}
            alt="Co ty, ochujałeś?"
            className="m-auto"
        />
    </div>
  )
}
