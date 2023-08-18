"use client"

import { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter()

    useEffect(() => {
        fetch(`http://localhost:3000/api/checkJwt`, {
            method: "POST",
            headers: {
                "authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then( res => res.json() )
        .then( data => {
            if(data.err != undefined){
                console.log("user don't logged")
            } else {
                router.push("/user/menu")
            }
        })
    }, [])

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [captcha, setCaptcha] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const logIn = () => {
        let ok = true
        console.log("Klik")

        if(username == ""){ ok = false; setErrMsg("enter your username") }
        if(password == ""){ ok = false; setErrMsg("enter your password") }
        if(captcha == ""){ ok = false; setErrMsg("don't be a robot") }

        if(ok){
            fetch(`http://localhost:3000/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    captcha: captcha
                })
            })
            .then( res => res.json() )
            .then(data => {
                if(data.err != undefined){
                    setErrMsg(data.err)
                }else{
                    setErrMsg("")
                    localStorage.setItem("jwt", data.jwt)
                    router.push("/user/menu")
                }
            })
        }
    }

    return (
        <div className="p-4 m-auto mt-8 border w-full md:w-min flex flex-col gap-4 rounded-xl shadow-xl justify-start items-start">
            <h1 className="text-2xl font-bold">Logowanie</h1>

            <label htmlFor="username" className="mb-[-8px]">Login</label>
            <input type="text" id="username" placeholder="eg. JakKowalki" className="p-2 outline-none shadow-xl rounded-xl pl-4 border 
            transition hover:bg-cyan-100 focus:bg-cyan-100 w-full" onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="password" className="mb-[-8px]">Hasło</label>
            <input type="password" id="password" placeholder="eg. **********" className="p-2 outline-none shadow-xl rounded-xl pl-4 border 
            transition hover:bg-cyan-100 focus:bg-cyan-100 w-full" onChange={(e) => setPassword(e.target.value)}/>

            <div className="m-auto"><ReCAPTCHA
                sitekey="6LdJyf4mAAAAAEKhfXx4J0fuqQPAsKgTFS-jUpsb"
                onChange={(e) => {setCaptcha(e)}}
            /></div>

            {
                errMsg == "" ? "" : <p className="text-red-500 font-semibold">{errMsg}</p>
            }
            
            <button onClick={() => logIn()} className="p-2 rounded-xl bg-slate-500 text-slate-200 hover:bg-slate-400 transition w-full shadow-xl">Zaloguj się</button>
        </div>
    )
}
