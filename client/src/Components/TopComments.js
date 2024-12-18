import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../Styles/TopComments.scss';

const TopComments = () => {
    const [ topComments, setTopComments ] = useState([]);

    useEffect(() => {
        Axios.get('https://new-movie-database-project-324cacc8b1a4.herokuapp.com/topComments')
            .then(res => setTopComments(res.data))
    },[])

    const displayComments = topComments
        .map((i) => {
            console.log(i)
            return (
                <ul className="topCommentsUL" key={i._id}>
                    <li key={i._id}><strong>{i._id}</strong></li>
                    <li key={i.count}>Total Comments: {i.count}</li>
                </ul>
            )
        })

    return (
        <div>
            <h3 style={{marginLeft: "5px"}}>Top Commenters</h3>
            { displayComments }
            <div className="topCommentsContainer"></div>
        </div>
    )
}

export default TopComments
