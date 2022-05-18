const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = 8005
const app = express()

const postsRoutes = require("./routes/post")
const usersRoutes = require("./routes/user")

//handling cross origin request
app.use(cors())

//Url encoding parsing
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/post", postsRoutes)
app.use("/user", usersRoutes)


//connect to db
mongoose.connect("mongodb://localhost:27017/social", {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log("Connected to Database");
})

app.listen(PORT, ()=>{
    console.log("Connected to port : "+PORT);
})
