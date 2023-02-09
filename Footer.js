import React from 'react'
import { NavLink } from 'react-router-dom'
const Footer = () => {
    return (
        <footer  className="bg-white text-dark pt-5 pb-4">
            <div className='container text-center text-md-left'>
            
                <div className='row text-center text-md-left'>
                    <div className='col-md-3 col-lg-3 col-xl-3 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-danger'>Red Or What</h5>
                        <blockquote>
                            <p> “The best way to learn about wine is by drinking.”</p>
                            <p>-Drink good, drink wine.</p>
                        </blockquote>
                    </div>
                    <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-danger'>Types of Wines</h5>
                        <p>Red</p>
                        <p>White</p>
                        <p>Roze</p>
                        <p>Spumante</p>
                    </div>
                    <div className='col-md-4 col-lg-3 col-xl3 mx-auto mt-3'>
                        <h5 className='text-uppercase mb-4 font-weight-bold text-danger'>Contact us</h5>
                        <p>
                            redorwhat@gmail.com
                        </p>
                        <p>
                            +355 000 00 00
                        </p>
                        <p>
                            +355 111 11 11
                        </p>
                    </div>
                    
                </div>
            </div>
        </footer>
    )
}

export default Footer