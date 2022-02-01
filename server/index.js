const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MovieModel = require('./models/Movies');
const CommentModel = require('./models/Comments');
const cors = require('cors');


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
    let rating = { "imdb.rating": { $gt: 8.5 } }
    MovieModel.find(rating, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
});

// app.get('/comments', (req, res) => {
//     CommentModel.find({}, (err, result) => {
//         if (err) {
//             res.json(err)
//         } else {
//             res.json(result)
//         }
//     })
// });

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

app.listen(3001, () => {
    console.log('You are connected')
});

