const Comment = require("../models/comment")
const Post = require("../models/post")

const getComments = async (req, res)=>{
    try{
        const comment = await Comment.find({post: req.params.postId}).populate('owner', 'name').sort({createdAt: -1})
        res.json(comment)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const createComment = async (req, res)=>{
    let text = req.body.title
    let data = new Comment({
        title: text,
        owner: req.user.id,
        post: req.body.post
    })
    try{
        const savedData = await data.save()
        res.json(savedData)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const deleteComment = async (req, res)=>{
    let id = req.params.id
    try{
        const deletedData = await Comment.findByIdAndRemove(id)
        res.json(deletedData)
    }catch(e){
        res.status(404).json({error: e})
    }
}

module.exports = {getComments, createComment, deleteComment}