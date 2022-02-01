const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    cast: {
        type: Array,
        required: true,
    },
    rated: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        required: false,
    },
    imdb: {
        type: Array,
        required: false,
    },
});

const MovieModel = mongoose.model("movies", MovieSchema);

module.exports = MovieModel;