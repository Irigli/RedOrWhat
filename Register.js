import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [registerd, setRegisterd] = useState("");
    const [err, setErr] = useState([]);
    const navigate = useNavigate

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = e =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/register",
        user,
        {withCredentials:true})
        .then(res => {
            console.log(res.data);

            setUser({
                name:"",
                email:"",
                password:"",
                confirmPassword:""
            })

            navigate("/home")
        })
        .catch((err) =>{
            console.log(err);
            console.log(err.response.data);
            setErr(err.response.data.errors);
        })
    };

    return (
        <div className='header'>

            {
                registerd ?
                <h4>{registerd}</h4>
                : null
            }
            <div className='content1'>
                <form  onSubmit={register}>
                    <div>
                        <div>
                            <label>User Name</label><br/>
                            {
                                err.name ?
                                <span className='error-text'>{err.name.message}</span>
                                : null
                            }
                            <input className='form-control' type={'text'} name="name" value={user.name} onChange={(e) => handleChange(e)}/>
                        </div>
                        <div>
                            <label>Email</label><br/>
                            {
                                err.email ?
                                <span className='error-text'>{err.email.message}</span>
                                :null
                            }
                            <input className='form-control' type={'email'} name="email" value={user.email} onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Password</label><br/>
                            {
                                err.password ?
                                <span className='error-text'>{err.password.message}</span>
                                :null
                            }
                            <input className='form-control' type={'password'} name="password" value={user.password} onChange={(e) => handleChange(e)}/>
                        </div>
                        <div>
                            <label>Confirm Password</label><br/>
                            {
                                err.passwordPassword ?
                                <span className='error-text'>{err.confirmPassword.message}</span>
                                :null
                            }
                            <input className='form-control' type={'password'} name="confirmPassword" value={user.confirmPassword} onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <input className='btn btn-dark' type={"submit"} value={"Sign Up"}/>
                </form>
            </div>
        </div>
    )
}

export default Register