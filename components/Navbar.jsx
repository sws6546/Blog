import Link from "next/link"

export default function Navbar() {
    return (
        <div className="p-4 bg-orange-300 shadow-2xl pl-8 pr-8 flex flex-row justify-between items-center">
            <Link href="/about" className="hover:underline hover:text-blue-600 transition">O nas</Link>
            <Link href="/" className="text-2xl font-bold hover:underline hover:text-blue-600 transition">Barta Szymona Świat</Link>
            <Link href="/user" className="hover:underline hover:text-blue-600 transition">+</Link>
        </div>
    )
}
