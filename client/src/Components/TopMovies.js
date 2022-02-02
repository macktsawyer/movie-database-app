import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Styles/topMovies.scss';

const TopMovies = () => {
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/top')
            .then(res => setTopMovies(res.data))
    },[])

    const displayTop = topMovies
        .splice(0, 10)
        .map((i) => {
            return (
                <li key={i._id}>{i.title}</li>
            )
        })

    return (
        <div>
            <ul className={"topMoviesList"}>
                { displayTop }
            </ul>
        </div>
    )
}

export default TopMovies
