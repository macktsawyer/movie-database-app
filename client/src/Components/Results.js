import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';
import '../Styles/Results.scss';

const Results = ({searchCriteria}) => {
    const [searchResults, setSearchResults] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const dataPerPage = 10;
    const pagesVisited = pageNumber * dataPerPage;
    const pageCount = Math.ceil(searchResults.length / dataPerPage);

    const displayResults = searchResults.length ? searchResults
        .slice(pagesVisited, pagesVisited + dataPerPage)
        .map((i) => {
            return (
                <Paper key={i._id} className='displayedResults'>
                    <Grid container direction="row" spacing={4}>
                        <Grid item xs={4} className="moviePoster">
                            <img alt="Movie Poster" style={{width:"200px"}} src={i.poster}></img>
                        </Grid>
                        <Grid item xs={8}>
                            <h4>{i.title}</h4>
                            <h5>{i.year}</h5>
                            {i.rated && <h5>Rated - {i.rated}</h5>}
                            <h5>{i.imdb.map((x) => {
                                return (
                                    <p key={x.rating}><span>IMDB Rating - </span>{x.rating}</p>
                                    )
                            })}</h5>
                            <ul className="inlineList">{i.genres.map((g) => {
                                return (
                                <li key={g}>{g}</li>
                                    )
                            })}</ul>
                            <p>{i.plot}</p>
                            <ul className="castList">{i.cast.map((r) => {
                                return (
                                    <li key={r}>{r}</li>
                                    )
                            })}</ul>
                        </Grid>
                    </Grid>
                </Paper>
            )
        }) : 'No Results';

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        if (searchCriteria) {
            Axios.get(`https://new-movie-database-project-324cacc8b1a4.herokuapp.com/getMovies/${searchCriteria}`)
                .then(res => setSearchResults(res.data))
                .then(setIsLoading(false))
        } else if (!searchCriteria) {
            Axios.get(`https://new-movie-database-project-324cacc8b1a4.herokuapp.com/getMovies/Fox`)
                .then(res => setSearchResults(res.data))
                .then(setIsLoading(false))
        }
    },[searchCriteria])

    return (
        <Box>
            <Container className="resultsContainer">
                <Grid container spacing={2}>
                    <Paper elevation={12}>
                        {/* {searchResults.length}
                        {searchCriteria}  */}
                    </Paper>
                    {isLoading ? <p style={{color: "white"}}>Loading...</p> : displayResults}
                    <ReactPaginate 
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        activeClassName={"paginationActive"}
                    />
                </Grid>
            </Container>
        </Box>
    )
}

export default Results