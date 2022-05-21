const express = require("express")
const router = express.Router()
const {getPosts, createPost, deletePost, updatePost, increaseVote} = require("../controllers/post")
const { authorize } = require("../middlewares/auth")

router.get("/", getPosts) // /post
router.post("/", authorize, createPost) // /post
router.delete("/:id", deletePost) // /post/:id
router.put("/:id", updatePost)
router.put("/vote/:id", increaseVote) // /post/vote/:id

module.exports = router