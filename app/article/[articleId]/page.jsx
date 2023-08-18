import Head from "next/head";
import { notFound } from "next/navigation";
import mysql from 'mysql'

export default async function Article({ params }) {
    async function getArticleContent(title){
        "use server"

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

        function getArticlecontentFromSql(title){
            return new Promise(resolve => {
                const sql = "SELECT * FROM `articles` WHERE title = " + mysql.escape(title)
                con.query(sql, (err, res) => {
                    if (err) {
                        resolve({err: JSON.parse(JSON.stringify(err))})
                    }
                    else {
                        try{
                            resolve(JSON.parse(JSON.stringify(res)))
                        }
                        catch{
                            resolve("not found")
                        }
                    }
                })
            })
        }

        return await getArticlecontentFromSql(title)
    }

    const articleData = await getArticleContent(decodeURI(params.articleId))
    if(articleData.length == 0){
        notFound()
    }else{
        return (
            <>
                <Head>
                    <title>{decodeURI(params.articleId)}</title>
                </Head>
                <div className="w-[90vw] lg:w-1/2 mt-4 m-auto text-justify">
                    <h1 className="p-4 text-3xl font-semibold">{decodeURI(params.articleId)}</h1>
                    <div className="pl-4 pr-4 flex flex-row justify-between p-2">
                        <p className="text-sm">{articleData[0].author}</p>
                        <p className="text-sm text-slate-500">{articleData[0].date}</p>
                    </div>
                    <p className="p-4 text-xl" dangerouslySetInnerHTML={{__html: articleData[0].content}} />
                </div>
            </>
        )
    }
}
