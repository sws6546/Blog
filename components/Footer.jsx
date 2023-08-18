import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className='bg-slate-800 p-2 fixed bottom-0 w-full text-slate-500 pl-8 pr-8 flex flex-row items-center gap-4'>
            <Link href="https://szymonprzezdziek.live/" className="hover:text-blue-500 hover:underline transition">my page</Link>
            <p>kontakt: szymon.przezdziek@uczen.ezn.edu.pl</p>
            <Link href="https://github.com/sws6546"><Image src={'/ghLogo.png'} width='30' height='30'/></Link>
        </footer>
    )
}
