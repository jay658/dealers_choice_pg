const express = require ("express")
const db = require("./db")
const sql = require("./sql")

const app = express()

const setUp = async()=>{
    await db.connect();
    
    await db.query(sql)
    
    const PORT = process.env.PORT || 3000

    app.listen(PORT, ()=>{
        console.log('server is running')
    })
}

setUp()

app.get('/', async (req, res, next)=>{
    try{
        const response = await db.query('SELECT * FROM theCast;')
        const casts = response.rows
        res.send(`
            <http>
                <head>
                    <title>Title Working</title>
                </head>
                <body>
                    <h1>Its Always Sunny in Philadephia</h1>
                    <h2>The Gang</h2>
                    <ul>
                    ${
                        casts.map(cast =>`
                                <li><a href= /about/${cast.id}>${cast.name}</a></li>
                            `
                            ).join(" ")
                    }
                    </ul>
                    <div><a href = /create>Come join the gang</a></div>
                </body>
            </http>
        `)
    }catch(err){
        next(err)
    }
})

app.get('/about/:id', async (req, res, next)=>{
    try{
        const request = req.params.id
        const response = await db.query('SELECT * FROM theCast JOIN theRoles ON theCast.id = theRoles.cast_id WHERE theCast.id=$1', [request])
        const character = response.rows
        res.send(`
            <html>
            <head></head>
            <body>
                <h1>${character[0].name}</h1>
                <ul>
                    ${
                        character.map(item=>
                            `
                                <li>${item.role}</li>
                            `
                        ).join("")
                    }
                </ul>
                <div><a href = "/">Go Back</a></div>
            </body>
            </html>
        `)
    }catch(err){
        next(err)
    }
})
