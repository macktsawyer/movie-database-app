import React, { useState } from 'react';
import Results from './Results';
import TextField from '@mui/material/TextField';

const Search = () => {
    const [movieSearch, setMovieSearch] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setMovieSearch(e.target.value);
        console.log(movieSearch);
    }

    return (
        <div>
            <div>
                <TextField id='standard-basic' label='Search For A Movie' variant='standard' onChange={handleChange} margin='normal' />
            </div>
            <div>
                <Results searchCriteria={movieSearch} />
            </div>
        </div>
    )
}

export default Search