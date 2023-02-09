import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className='header'>
            <div className='container'>

            
                <div className='banner-text'>
                    <h1 className='home-text'>Red Or What...</h1>
                </div>
                <p>Find the best Wines in the town</p>
                    <Link className={'btn btn-outline-dark'} to={'/wines'}>See all the Wines</Link>
            </div>
        </div>
    )
}

export default Home