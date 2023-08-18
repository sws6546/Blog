import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

function authorizeToken(userJwt){  // if token is good, return true.
    const userToken = userJwt.split(" ")[1]
    let isTokenGood = false
    jwt.verify(userToken, process.env.SECRET_JWT, (err, user) => {
        if(err) {
            isTokenGood = false
        }
        else {
            isTokenGood = true
        }
    })
    return isTokenGood
}

export async function POST(request) {
    const headersList = headers()
    const userJwt = headersList.get('authorization')
    if(userJwt == null){
        return NextResponse.json({ err: "token not found "})
    }
    if(!authorizeToken(userJwt)){
        return NextResponse.json({ err: "bad token" })
    }

    return NextResponse.json({ res: "user logged in" })
}