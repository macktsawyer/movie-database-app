const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MovieModel = require('./models/Movies');
const CommentModel = require('./models/Comments');
const cors = require('cors');
require('dotenv').config(); 

const PORT = process.env.PORT || '3001';

app.use(express.json());
app.use(cors());
dotenv.config();

const mongooseAPI = process.env.MONGOOSE_API;

mongoose.connect(
    `${mongooseAPI}`
);

app.get('/getMovies', (req, res) => {
    MovieModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.get('/getMovies/:movie', (req, res) => {
    let myQuery = req.params.movie;
    MovieModel.find({ $text: { $search: myQuery }}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});

app.get('/top', (req, res) => {
    MovieModel.find({ 
        'imdb.rating': { $gt: 8.5}
    })
    .limit(10)
    .sort({'imdb.rating': -1})
    .exec(
    function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});

app.get('/topComments', (req, res) => {
    CommentModel.aggregate([{ $group: { _id: '$name', count: { $sum: 1 }}}, 
    { "$sort": { count: -1 }}, 
    { "$limit": 10 }], 
    function(err, result) {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});


app.listen(PORT, () => {
    console.log('You are connected')
});

