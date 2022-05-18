const express = require("express")
const router = express.Router()
const {getPosts, createPost, deletePost, updatePost, increaseVote} = require("../controllers/post")

router.get("/", getPosts) // /post
router.post("/", createPost) // /post
router.delete("/:id", deletePost) // /post/:id
router.put("/:id", updatePost)
router.put("/vote/:id", increaseVote) // /post/vote/:id

module.exports = router