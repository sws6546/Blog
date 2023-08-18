import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import mysql from 'mysql'
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

con.connect((err) => {
    if (err) {
        console.error('error with db:', err)
    } else {
        console.log('Connected')
    }
})

async function comparePassword(plaintextPassword, hash) {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
}

async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 11);
    return hash
}

function getUserPassword(username){
    return new Promise(resolve => {
        const sql = `SELECT password FROM users WHERE username = ${mysql.escape(username)}`
        con.query(sql, (err, res) => {
            if (err) {
                resolve({err: JSON.parse(JSON.stringify(err))})
            }
            else {
                resolve(JSON.parse(JSON.stringify(res[0].password)))
            }
        })
    })
}

function updateUserPassword(username, password){
    return new Promise(resolve => {
        const sql = `UPDATE users SET password = ${mysql.escape(password)} WHERE username = ${mysql.escape(username)}`
        con.query(sql, (err, res) => {
            if (err) {
                resolve({err: JSON.parse(JSON.stringify(err))})
            }
            else {
                resolve("Updated")
            }
        })
    })
}

function authorizeToken(userJwt){
    const userToken = userJwt.split(" ")[1]
    let isTokenGood = [false, '']
    jwt.verify(userToken, process.env.SECRET_JWT, (err, user) => {
        if(err) {
            isTokenGood = [false, user]
        }
        else {
            isTokenGood = [true, user]
        }
    })
    return isTokenGood
}

export async function POST(request){
    const headersList = headers()
    const userJwt = headersList.get('authorization')
    if(userJwt == null){
        return NextResponse.json({ err: "token not found "})
    }
    const jwtData = authorizeToken(userJwt)
    if(!jwtData[0]){
        return NextResponse.json({ err: "bad token" })
    }

    const {oldPwd, newPwd} = await request.json()
    if(oldPwd.length == 0){ return NextResponse.json({ err: "Old password not found" }) }
    if(newPwd.length == 0){ return NextResponse.json({ err: "New password not found" }) }

    const oldPwdHash = await getUserPassword(jwtData[1])
    if( !await comparePassword(oldPwd, oldPwdHash) ){
        return NextResponse.json({ err: "old password is incorrect" })
    }
    return NextResponse.json( await updateUserPassword(jwtData[1], await hashPassword(newPwd)) )
}