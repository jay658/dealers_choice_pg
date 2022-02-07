const express = require ("express")

const app = express()
const PORT = process.env.PORT || 3000

const pg = require('pg')

const client = new pg.Client('postgres://localhost/mydata')

const addData = async()=>{
    client.connect()
    const SQL = `
        DROP TABLE IF EXISTS theRoles;
        DROP TABLE IF EXISTS theCast;

        CREATE TABLE theCast(
            id INTEGER PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            species VARCHAR(50),
            intelligence VARCHAR(50)
        );

        CREATE TABLE theRoles(
            id INTEGER PRIMARY KEY,
            role VARCHAR(50) NOT NULL,
            cast_id INTEGER REFERENCES theCast(id)
        );

        INSERT INTO theCast (id, name, species, intelligence) VALUES (1, 'Charlie Kelly', 'Human', 'No');
        INSERT INTO theCast (id, name, species, intelligence) VALUES (2, 'Ronald ''Mac'' McDonald', 'Human', 'No');
        INSERT INTO theCast (id, name, species, intelligence) VALUES (3, 'Dennis Reynolds', 'Human', 'No');
        INSERT INTO theCast (id, name, species, intelligence) VALUES (4, 'Deandra ''Sweet Dee'' Reynolds', 'Bird', 'No');
        INSERT INTO theCast (id, name, species, intelligence) VALUES (5, 'Frank Reynolds', 'Half of a Human', 'Maybe, but probably no');
        INSERT INTO theRoles (id, role, cast_id) VALUES (1, 'Wild Card', 1);
        INSERT INTO theRoles (id, role, cast_id) VALUES (2, 'Janitor', 1);
        INSERT INTO theRoles (id, role, cast_id) VALUES (3, 'Bouncer', 2);
        INSERT INTO theRoles (id, role, cast_id) VALUES (4, 'Manager', 2);
        INSERT INTO theRoles (id, role, cast_id) VALUES (5, 'Psychopath', 3);
        INSERT INTO theRoles (id, role, cast_id) VALUES (6, 'Bird', 4);
        INSERT INTO theRoles (id, role, cast_id) VALUES (7, 'Business Man', 5);
        INSERT INTO theRoles (id, role, cast_id) VALUES (8, 'Waitress', 4);
    `
    await client.query(SQL)
}

addData()


app.get('/', async (req, res, next)=>{
    try{
        const response = await client.query('SELECT * FROM theCast;')
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
        const response = await client.query('SELECT * FROM theCast JOIN theRoles ON theCast.id = theRoles.cast_id WHERE theCast.id=$1', [request])
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


app.listen(PORT, ()=>{
    console.log('server is running')
})