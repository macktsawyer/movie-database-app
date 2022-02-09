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
                <ul className={"topMoviesList"}>
                    <li key={i._id}>{i.title}</li>
                    {i.imdb.map((r) => {
                        return (
                        <li>{r.rating}</li>)
                    })}
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
