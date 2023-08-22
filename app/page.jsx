import Link from "next/link"
import mysql from 'mysql'


export default async function Home() {
    async function getArticles(){
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

        function getArticlesFromSql(){
            return new Promise(resolve => {
                const sql = "SELECT title, author, date FROM `articles`"
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

        return await getArticlesFromSql()
    }

    
    // const articlesList = [{title: "Testowy Tytuł 2115", author: "chadSzymon2115", date: "05 03 2050"}]
    const articlesList = await getArticles()

    if(articlesList.length == 0){
        return (
            <h1 className="text-xl text-center text-slate-600 p-4">Nie znaleziono artykułów :(</h1>
        )
    } else {
        return (
            <div className="p-4 w-full md:w-1/2 lg:w-1/4 flex flex-col items-start text-center m-auto gap-8">
                {
                    articlesList.map((article, id) => (
                        <Link key={id} href={`/article/${article.title}`} className="hover:underline hover:text-blue-600 transition flex flex-col w-full shadow-xl
                        p-4 rounded-xl">
                            <h1 className="text-2xl font-bold">{article.title}</h1>
                            <div className="flex flex-row justify-between gap-3">
                                <p>{article.author}</p>
                                <p className="text-slate-500">{article.date}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        )
    }   
}
