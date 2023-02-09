import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = ({userName,isLoggedin, setIsLoggedin, role, setRole}) => {
    const [active, setActive] = useState("nav__menu")

    const navigate = useNavigate();
        

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout",{}, {
            withCredentials:true
        })
        .then((res) => {
            setIsLoggedin(false)
        })
        .then((res) =>{
            console.log(isLoggedin);
            setIsLoggedin(false);
            setRole('');
            navigate("/login")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
            <div className={'nav'}>
                
                <h2 className='font-weight-bold text-danger'>Red Or what</h2>
            
                <li className={active}>
                    <li className='nav__item'><NavLink to={'/home'} className={'brand'}>Home</NavLink></li>
                    <li className='nav__item'><NavLink to={'/add'} className={'brand'}>Add Wine</NavLink></li>
                    <li className='nav__item'><NavLink to={'/list'} className={'brand'}>List</NavLink></li>
                    <li className='nav__item'><NavLink to={'/wines'} className={'brand'}>All Wines</NavLink></li>
                    <li  className='nav__item'><NavLink to={'/about'} className={'brand'}>About</NavLink></li>
                    {
                        isLoggedin ?
                        <li className='nav__item'><button className='btn btn-danger' onClick={(e) => logout(e)}>Logout</button></li>
                        : 
                        <li className='nav__item'>
                            <NavLink className={'btn btn-outline-danger'} to={'/login'}>Login</NavLink> 
                            <NavLink className={'btn btn-outline-danger'} to={'/register'}>Sign Up</NavLink>
                        </li>
                    }

                </li>
                
            </div>
    )
}

export default Header