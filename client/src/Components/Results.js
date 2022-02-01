import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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
        .splice(pagesVisited, pagesVisited + dataPerPage)
        .map((i) => {
            return (
                <Paper>
                    <h4>{i.title}</h4>
                    <h5>{i.year}</h5>
                    <p>{i.plot}</p>
                    <ul className={"castList"}>{i.cast.map((r) => {
                        return (
                            <li>{r}</li>
                            )
                    })}</ul>
                </Paper>
            )
        });

    const changePage = ({selected}) => {
        setPageNumber(selected);
    }

    useEffect(() => {
        if (searchCriteria) {
            Axios.get(`http://localhost:3001/getMovies/${searchCriteria}`)
                .then(res => setSearchResults(res.data))
        } else if (!searchCriteria) {
            Axios.get(`http://localhost:3001/getMovies/Fox`)
                .then(res => setSearchResults(res.data))
        }
    },[searchCriteria])

    console.log(searchResults)

    return (
        <Box>
            <Grid container spacing={2}>
                <Paper elevation={12}>
                    {searchResults.length}
                    {searchCriteria}
                    
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
        </Box>
    )
}

export default Results