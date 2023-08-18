"use client"

import { useState } from 'react'
import { useRouter } from "next/navigation";

export default function AddPost() {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const [article, setArticle] = useState("")

    const updateArticle = (e) => {
        setArticle(e.target.value.replace(/\r?\n/g, "<br />"))
    }

    const sendArticle = () => {
        fetch("http://localhost:3000/api/addArticle", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "authorization": `Bearer ${localStorage.jwt}`
            },
            body: JSON.stringify({
                title: title,
                article: article
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.err || data.res)
            if(data.res != undefined){
                router.push("/")
            }
        })
    }
    
    return (
        <>
            <div className='flex flex-col w-full md:w-1/2 m-auto gap-3'>
                <label htmlFor="titleArea" className='text-xl mb-[-8px]'>Tytuł: </label>
                <textarea id="titleArea" rows="3" className='border rounded-xl p-3 shadow-xl' onChange={(e) => setTitle(e.target.value)}></textarea>

                <label htmlFor="articleArea" className='text-xl mb-[-8px]'>Treść: </label>
                <textarea id="articleArea" rows="10" className='border rounded-xl p-3 shadow-xl' onChange={updateArticle}></textarea>

                <button className="p-2 rounded-xl bg-slate-500 text-slate-200 hover:bg-slate-400 transition w-full shadow-xl"
                onClick={() => sendArticle()}>Wrzuć Artykuł</button>
            </div>
        </>
    )
}
