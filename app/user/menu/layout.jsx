"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RootLayout({ children }) {
    const router = useRouter()

    const [confirmLogged, setConfirmLogged] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/api/checkJwt`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then( res => res.json() )
        .then( data => {
            if(data.err != undefined){
                router.push("/user")
            }
            else{
                setConfirmLogged(true)
            }
        })
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <div className="p-2 flex flex-row gap-4 justify-center items-center shadow-xl flex-wrap">
                <Link href="/user/menu/addPost" className="p-2 bg-cyan-300 rounded-xl hover:bg-cyan-400 transition shadow-md">Napisz Artykuł</Link>
                <Link href="/user/menu/settings" className="p-2 bg-cyan-300 rounded-xl hover:bg-cyan-400 transition shadow-md">Zmień Hasło</Link>
                <button onClick={() => {
                    localStorage.clear()
                    router.push("/")
                }} className="p-2 text-red-900 bg-red-400 rounded-xl hover:bg-red-600 hover:text-red-200 transition shadow-md"
                >Wyloguj</button>
            </div>
            {children}
        </div>
    )
}