import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Styles/TopComments.scss';

const TopComments = () => {
    const [ topComments, setTopComments ] = useState([]);

    useEffect(() => {
        Axios.get('https://movie-search-database-app.herokuapp.com/topComments')
            .then(res => setTopComments(res.data))
    },[])

    const displayComments = topComments
        .map((i) => {
            return (
                <ul className="topCommentsUL" key={i._id}>
                    <li key={i._id}>{i._id}</li>
                    <li key={i.count}>Total Comments: {i.count}</li>
                </ul>
            )
        })

    console.log(topComments)

    return (
        <div>
            <h3 style={{marginLeft: "5px"}}>Top Commenters</h3>
            { displayComments }
        </div>
    )
}

export default TopComments
