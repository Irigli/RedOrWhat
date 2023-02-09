import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {  NavLink,useNavigate, useParams } from 'react-router-dom';
import FileBase64 from 'react-file-base64';


const Update = () => {
    const {id} = useParams();

    const [wines, setWines] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [place, setPlace] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const [nameErrors, setNameErrors] = useState([]);
    const [typeErrors, setTypeErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/redorwhat')
        .then((res) => {
            setWines(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/redorwhat/'+ id)
        .then(res => {
            setName(res.data.name);
            setType(res.data.type);
            setPrice(res.data.price);
            setPlace(res.data.place);
            setImage(res.data.image);
            setDescription(res.data.description);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    const updateWine = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/redorwhat/' +id, {
            name:name,
            type:type,
            price:price,
            place:place,
            image:image,
            description:description
        },
        {
            withCredentials:true
        })
        .then(res => {
            console.log(res);
            navigate('/list')
        })
        .catch((err)=> {
            console.log(err)
            setNameErrors(err.response.data.errors.name.message)
            setTypeErrors(err.response.data.errors.type.message)
        })
    }
    const cancelHandle = () => {
        navigate('/products')
    }
        const foundItem = wines.find((item) => {
            return item._id === id
        })
    return (
        <div className='div-display'>

            {
                foundItem ?
                <div >
                    <h2>Edit {name}</h2>

                <form onSubmit={updateWine}>
                    <div>
                    {
                        image?
                        <div  className='col-6 mx-auto'>
                            <img src={image}/>
                        </div>
                        : null
                    }

                        <label className="sr-only">Image</label><br/>
                        <FileBase64
                            multiple={false}
                            onDone={({base64}) => setImage(base64)}
                        />
                        <div className='form'>
                            <div className='content2'>
                                
                                <label className="sr-only">Name of the Wine</label><br/>
                                <input value={name}  className="form-control mx-sm-3" type={'text'} onChange={(e) => setName(e.target.value)}/><br/>
                                {nameErrors ? <span style={{color:'red'}}>*{nameErrors}</span>:null}<br></br>
                                <label className="sr-only">Wine Type</label><br/>
                                <select value={type}  className='form-select' onChange={(e) => setType(e.target.value)}>
                                    <option></option>
                                    <option value="Red">Red</option>
                                    <option value="White">White</option>
                                    <option value="Roze">Roze</option>
                                    <option value="Spumante">Spumante</option>
                                </select>
                                {typeErrors ? <span style={{color:'red'}}>*{typeErrors}</span>:null}<br></br>
                                

                                <label className="sr-only">Price $</label><br/>
                                <input value={price}  className="form-control mx-sm-3" type={'number'} onChange={(e) => setPrice(e.target.value)}/><br/>
                                <label className="sr-only">Made In</label><br/>
                                <input value={place}  className="form-control mx-sm-3" type={'text'} onChange={(e) => setPlace(e.target.value)}/><br/>
                            
                                <label className="sr-only">Product Description</label><br/>
                                <input value={description}  className="form-control mx-sm-3" type={'text'} onChange={(e) => setDescription(e.target.value)}/><br/>
                                <input className="btn btn-success" type={'submit'} value={'Update Product'}/>
                                <button className="btn btn-dark" onClick={(e) => cancelHandle()}>Cancel</button>
                            </div>
                        </div>
                    </div>

                </form>
                </div>
                :
                <div>
                    <p>"We're sorry, but the product you are looking for, couldn't be found. If you want to add another one to the store, you can click down below.</p>
                    <NavLink to={'/store/new'}>New</NavLink>
                </div>
            }
            <NavLink className={'btn btn-dark'} to={'/list'}>Back to list of products</NavLink>

        </div>
    ) 
}

export default Update