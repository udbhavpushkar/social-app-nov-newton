const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    description: {type: String, required: true},
    vote_count : {type: Number, default: 0},
    owner : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
},
{timestamps: true}
)

const Post = mongoose.model('posts', postSchema)

module.exports = Post