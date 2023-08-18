import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import mysql from 'mysql'
import jwt from "jsonwebtoken";

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

function getUser(username){
    return new Promise(resolve => {
        const sql = "SELECT * FROM `users` WHERE username = " + mysql.escape(username)
        con.query(sql, (err, res) => {
            if (err) {
                resolve({err: JSON.parse(JSON.stringify(err))})
            }
            else {
                resolve(JSON.parse(JSON.stringify(res)))
            }
        })
    })
}

async function checkCaptcha(captchaValue){
    let isNotRobot = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${captchaValue}`)
    isNotRobot = await isNotRobot.json()
    return isNotRobot
}

export async function POST(request) {
    const {username, password, captcha} = await request.json()
    const user = await getUser(username)
    const captchaCheck = await checkCaptcha(captcha)
    if(!captchaCheck.success){
        return NextResponse.json({"err": "don't be a robot"})
    }
    if(user.length == 0){
        return NextResponse.json({"err": "user not found"})
    }
    if(!await comparePassword(password, user[0].password)){
        return NextResponse.json({"err": "bad password"})
    }
    return NextResponse.json({
        "jwt": jwt.sign(username, process.env.SECRET_JWT),
        "success": `success logged as ${username}`
    })
}