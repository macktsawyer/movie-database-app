import React, { useState } from 'react';
import Results from './Results';
import TextField from '@mui/material/TextField';
import '../Styles/Results.scss';

const Search = () => {
    const [movieSearch, setMovieSearch] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setMovieSearch(e.target.value);
    }

    return (
        <div>
            <div className="searchContainer">
                <TextField style={{width:"30vw", color:"white"}} id='outlined-basic' placeholder='Search For A Movie' variant='outlined' onChange={handleChange} margin='normal' />
            </div>
            <div>
                <Results searchCriteria={movieSearch} />
            </div>
        </div>
    )
}

export default Search