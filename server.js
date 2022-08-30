const express = require("express")
const mysql = require("mysql2/promise")

const app = express()

let conn

async function rundb() {
    conn = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'example',
        database: 'blog'
    })

    app.listen(3000, () => {
        console.log("Server is running...")
    })
}

rundb()

app.get("/", async (req, res) => {
    const [users] = await conn.execute("SELECT * FROM users")
    console.log(users)
    res.send(`
    <h1>Hello from Express WSL2</h1>
    <ul>
        ${users.map(user => `<li>${user.username}:${user.email}</li>`)}
    </ul>
    `)
})

