import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {NavLink, useNavigate} from 'react-router-dom'

import FileBase64 from 'react-file-base64';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');


    const [nameErrors, setNameErrors] = useState([]);
    const [typeErrors, setTypeErrors] = useState([]);
    const navigate = useNavigate();


    const onSubmitHandler = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/redorwhat',{
            name,
            type,
            price,
            image,
            place,
            description
        },{
            withCredentials:true
        })
        .then((res) => {
            console.log(res.data);
            navigate('/list')
        })
        .catch((err)=> {
            console.log(err)
            setNameErrors(err.response.data.errors.name.message)
            setTypeErrors(err.response.data.errors.type.message)
        })
    }

    const cancelHandle = () => {
        navigate('/list')
    }
    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler}>
                <div>
                        {
                            image?
                            <div  className='col-6 mx-auto'>
                                <img src={image}/>
                            </div>
                            : null
                        }
                    <label className="sr-only">Upload your wine Image</label><br/>
                    <FileBase64 
                        multiple={false}
                        onDone={({base64}) => setImage(base64)} 
                    /><br/>
                    

                    <div className='form'>

                        <div className='content2' >
                            <label className="sr-only  input64">Name of the wine</label><br/>
                            <input className="form-control mx-sm-3  input64" type={'text'} onChange={(e) => setName(e.target.value)}/><br/>
                            {nameErrors ? <span style={{color:'red'}}>*{nameErrors}</span>:null}<br></br>
                            <label className="sr-only">Wine Type</label><br/>
                            <select className='form-select' onChange={(e) => setType(e.target.value)}>
                                <option></option>
                                <option value="Red">Red</option>
                                <option value="White">White</option>
                                <option value="Roze">Roze</option>
                                <option value="Spumante">Spumante</option>
                            </select><br/>
                            {typeErrors ? <span style={{color:'red'}}>*{typeErrors}</span>:null}<br></br>
                            
                        
                            <label className="sr-only">Price $</label><br/>
                            <input className="form-control mx-sm-3" type={'number'} onChange={(e) => setPrice(e.target.value)} placeholder={'Price in Dollars $'}/><br/>
                            <label className="sr-only">Made In</label><br/>
                            <input className="form-control mx-sm-3" type={'text'} onChange={(e) => setPlace(e.target.value)}/><br/>
                            <label className="sr-only">Description</label><br/>
                            <textarea className="form-control mx-sm-3" type={'text'} onChange={(e) => setDescription(e.target.value)}/>
                            <input className="btn btn-outline-danger" type={'submit'} value={'Add Product'}/>
                            <button className="btn btn-outline-danger" onClick={(e) => cancelHandle()}>Cancel</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default Form