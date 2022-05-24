const express = require("express")
const router = express.Router()
const {getComments, createComment, deleteComment} = require("../controllers/comment")
const { authorize } = require("../middlewares/auth")

router.get("/:postId", getComments)
router.post("/", authorize, createComment)
router.delete("/:id", deleteComment)

module.exports = router