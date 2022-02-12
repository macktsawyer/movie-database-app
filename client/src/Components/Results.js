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

    const dataPerPage = 10;
    const pagesVisited = pageNumber * dataPerPage;
    const pageCount = Math.ceil(searchResults.length / dataPerPage);

    const displayResults = searchResults
        .slice(pagesVisited, pagesVisited + dataPerPage)
        .map((i) => {
            return (
                <Paper key={i._id} className='displayedResults'>
                    <h4>{i.title}</h4>
                    <h5>{i.year}</h5>
                    <p>{i.plot}</p>
                    <ul className={"castList"}>{i.cast.map((r) => {
                        return (
                            <li key={r}>{r}</li>
                            )
                    })}</ul>
                    <img alt="Movie Poster" style={{width:"200px"}} src={i.poster}></img>
                </Paper>
            )
        });

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        if (searchCriteria) {
            Axios.get(`https://movie-search-database-app.herokuapp.com/getMovies/${searchCriteria}`)
                .then(res => setSearchResults(res.data))
        } else if (!searchCriteria) {
            Axios.get(`https://movie-search-database-app.herokuapp.com/getMovies/Fox`)
                .then(res => setSearchResults(res.data))
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
                    {displayResults}
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