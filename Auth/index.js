const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

// Our in memory DB
const users = []

const generateToken = () => {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let n = options.length
    let token = "" 
    for(let i=0; i<32; i++){
        token += options[Math.floor(Math.random()*n)]
    }
    return token
}

app.post("/signup", (req, res) => {
    const { username, password } = req.body

    try{
        users.push({
            username, password
        })
    
        res.send({
            message: "You have signed up successfully !"
        })

    }catch(err){
        res.send({message: "Error occurs while signing up. Please try again later."})
    }
})

app.post("/signin", (req, res) => {
    const { username, password} = req.body

    const user = users.find(user => user.username === username && user.password === password)

    if(user){
        const token= generateToken()
        user.token = token
        res.send({
            token
        })
        console.log(users)
    }else{
        res.status(403).send({message: "Invalid username or password"})
    }
})

app.listen(port, (err) => {
    console.log('server is runnig on port: ' + port)
})