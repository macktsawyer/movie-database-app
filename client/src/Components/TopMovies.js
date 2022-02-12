import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Styles/topMovies.scss';

const TopMovies = () => {
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        Axios.get('https://movie-search-database-app.herokuapp.com/top')
            .then(res => setTopMovies(res.data))
    },[])

    const displayTop = topMovies
        .map((i) => {
            return (
                <ul key={i._id} className={"topMoviesList"}>
                    <li key={i._id}>{i.title} - {i.imdb.map((r) => {
                        if (r.rating)
                        return (
                        <span key={r.rating}>{r.rating}</span>
                        )
                    })}</li>
                </ul>
            )
        })

    return (
        <div>
            <h3 style={{marginLeft: "45px"}}>Top Movies</h3>
            { displayTop }
        </div>
    )
}

export default TopMovies
