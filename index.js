const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const PORT = 8005
const app = express()
require('dotenv/config')

const postsRoutes = require("./routes/post")
const usersRoutes = require("./routes/user")
const commentRoutes = require("./routes/comment")

//handling cross origin request
app.use(cors())

//Url encoding parsing
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/post", postsRoutes)
app.use("/user", usersRoutes)
app.use("/comment", commentRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    console.log("Connected to Database");
})

app.listen(PORT, ()=>{
    console.log("Connected to port : "+PORT);
})
