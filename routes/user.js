const express = require("express")
const router = express.Router()
const {registerUser, loginUser, getUser} = require("../controllers/user")

const {authorize} = require("../middlewares/auth")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getUser", authorize, getUser)

module.exports = router