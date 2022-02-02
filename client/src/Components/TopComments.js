import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const TopComments = () => {
    const [ topComments, setTopComments ] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/topComments')
            .then(res => setTopComments(res.data))
    },[])

    const displayComments = topComments
        .splice(0, 10)
        .map((i) => {
            return (
                <ul key={i._id}>
                    <li key={i._id}>{i._id}</li>
                </ul>
            )
        })

    console.log(topComments)

    return (
        <div>
            <p>Top Commenters</p>
            { displayComments }
        </div>
    )
}

export default TopComments
