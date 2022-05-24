const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    title: {type: String, required: true},
    vote_count : {type: Number, default: 0},
    owner : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    post : {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'posts'}
},
{timestamps: true}
)

const Comment = mongoose.model('comments', commentSchema)

module.exports = Comment