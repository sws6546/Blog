"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Settings() {
    const [oldPwd, setOldPwd] = useState("")
    const [newPwd, setNewPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const router = useRouter()

    const changePassword = () => {
        fetch("http://localhost:3000/api/changePwd", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "authorization": `Bearer ${localStorage.jwt}`
            },
            body: JSON.stringify({
                oldPwd: oldPwd,
	            newPwd: newPwd
            })
        })
        .then( res => res.json() )
        .then( data => {
            if(data.err === undefined){
                alert("Hasło Zostało Zmienione")
                router.push("/user/menu")
            }else{
                setErrMsg(data.err)
            }
        })
    }

    return (
        <div className="w-full md:w-1/3 p-4 rounded-xl shadow-xl m-auto flex flex-col gap-2">
            <label htmlFor="oldPwd" className="mb-[-4px]">Stare Hasło</label>
            <input type="text" id="oldPwd" className="p-2 shadow-xl w-full rounded-xl border outline-none 
            hover:bg-cyan-100 focus:bg-cyan-100 transition" placeholder="eg. **************" onChange={(e) => setOldPwd(e.target.value)}/>

            <label htmlFor="newPwd" className="mb-[-4px]">Nowe Hasło</label>
            <input type="text" id="newPwd" className="p-2 shadow-xl w-full rounded-xl border outline-none 
            hover:bg-cyan-100 focus:bg-cyan-100 transition" placeholder="eg. **************" onChange={(e) => setNewPwd(e.target.value)}/>

            {
                errMsg == "" ? "" : <p className="text-red-500 font-semibold">{errMsg}</p>
            }

            <button className="p-2 mt-2 rounded-xl bg-slate-500 text-slate-200 hover:bg-slate-400 transition w-full shadow-xl"
            onClick={() => changePassword()}>Zmień Hasło</button>
        </div>
    )
}
