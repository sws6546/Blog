import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import mysql from 'mysql'

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

function getActualDate(){
    let date_ob = new Date();
    return `${("0" + date_ob.getDate()).slice(-2)} ${("0" + (date_ob.getMonth() + 1)).slice(-2)} ${date_ob.getFullYear()}`
}

function addArticle(title, article, author){
    return new Promise(resolve => {
        // const sql = "SELECT * FROM `users` WHERE username = " + mysql.escape(username)
        const sql = `INSERT INTO articles (article_id, title, content, author, date) VALUES (NULL, ${mysql.escape(title)}, ${mysql.escape(article)}, ${mysql.escape(author)}, ${mysql.escape(getActualDate())});`
        con.query(sql, (err, res) => {
            if (err) {
                resolve({err: JSON.parse(JSON.stringify(err))})
            }
            else {
                resolve({res: "added"})
            }
        })
    })
}

export async function POST(request) {
    const headersList = headers()
    const userJwt = headersList.get('authorization')
    if(userJwt == null){
        return NextResponse.json({ err: "token not found "})
    }
    if(!authorizeToken(userJwt)[0]){
        return NextResponse.json({ err: "bad token" })
    }

    const {title, article} = await request.json()
    if(title.length == 0){ return NextResponse.json({ err: "Title not found" }) }
    if(article.length == 0){ return NextResponse.json({ err: "Article not found" }) }
    
    const addToDbInfo = await addArticle(title, article, authorizeToken(userJwt)[1])

    return NextResponse.json(addToDbInfo)
}