const express = require("express");
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

app.post("/signup", function(req, res){
    
})
app.post("/signin", function(req, res){

})
app.post("/todo", function(req, res){

})
app.get("/todos", function(req, res){

})
app.listen(3000)