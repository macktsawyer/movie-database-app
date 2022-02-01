const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    movie_id: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
});

const CommentModel = mongoose.model("comments", CommentSchema);

module.exports = CommentModel;