const express = require("express")
const cors = require('cors')
const app = express()

// app.use(cors()) // not required if frontend is serving from same port

app.get("/sum", function(req, res){
    console.log(req.url, req.method)
    const a = parseInt(req.query.a)
    const b = parseInt(req.query.b)

    return res.json({
        ans: a+b
    })
})

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html")
})

app.listen(3000, (err) => {
    console.log("SERVER is running on PORT 3000")
})