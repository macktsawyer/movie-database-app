import React from 'react';
import Search from './Search.js';
import TopMovies from './TopMovies';
import TopComments from './TopComments';
import '../Styles/Home.scss' 

const Home = () => {
    return (
        <div className="fullContainer">
            <div className="topMovies">
                <TopMovies />
            </div>
            <div className="search">
                <Search />
            </div>
            <div className="TopComments">
                <TopComments />
            </div>
        </div>
    )
}

export default Home
