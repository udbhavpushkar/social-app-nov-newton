const Post = require("../models/post")

const getPosts = async (req, res)=>{
    try{
        const posts = await Post.find().sort({createdAt: -1})
        res.json(posts)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const createPost = async (req, res)=>{
    let text = req.body.description
    let data = new Post({
        description: text
    })
    try{
        const savedData = await data.save()
        res.json(savedData)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const deletePost = async (req, res)=>{
    let id = req.params.id
    try{
        const deletedData = await Post.findByIdAndRemove(id)
        res.json(deletedData)
    }catch(e){
        res.status(404).json({error: e})
    }
}

const updatePost = async (req, res)=>{
    let description = req.body.description
    let id = req.params.id
    try{
        let updatedData = await Post.findByIdAndUpdate(id, {description})
        res.json(updatedData)
    }catch(e){
        res.status(400).json({message: e})
    }
}

const increaseVote = async (req, res)=>{
    try{
        //find that post and its vote count &&increase the vote count by 1
        let postData = await Post.findById(req.params.id, 'vote_count') // {vote_count : 0}
        let new_vote_count = postData.vote_count + 1;
        console.log(new_vote_count);

        // update db with new value
        let updatedData = await Post.findByIdAndUpdate(req.params.id, {vote_count : new_vote_count})
        console.log(updatedData);
        res.json(updatedData)
    }catch(e){
        res.status(400).json({message: e})
    }
}

module.exports = {getPosts, createPost, deletePost, updatePost, increaseVote}