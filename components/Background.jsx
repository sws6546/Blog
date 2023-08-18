'use client'

import { useRef, useEffect } from "react"

export default function Background() {
    const element = useRef()
    
    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e 
            element.current.animate({
                left: `${clientX}px`,
                top: `${clientY}px`
            }, {duration: 5000, fill: "forwards"});
        })
    }, [])
    

    return (
        <div className="fixed w-full h-full top-0 left-0 -z-20"
        style={{
            filter: "blur(200px)"
        }}>
            <div ref={element} className="fixed w-[600px] h-[400px] bg-gradient-to-tr from-yellow-200 to-orange-300 -z-20 opacity-50 rounded-full 
            animate-[spin_10s_linear_infinite]"
            style={{
                top: '50%',
                left: '50%',
                translate: "-50% -50%"
            }}></div>
        </div>
    )
}
