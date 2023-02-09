import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

    const getFilteredItems = (query, wines, select) => {
        if(!query){
            return wines
        }
        else if (select==="Type"){
            return wines.filter((wines) => wines.type.includes(query));
        }
        else if (select==="Brand"){
            return wines.filter((wines) => wines.brand.includes(query));
        }
        return wines.filter((wines) => wines.instrument.includes(query));
    };
    

const List = () => {
    const [wines, setWines] = useState([]);
    const [query, setQuery] = useState(''); 
    const [select, setSelect] = useState('');
    const navigate = useNavigate();

    const filteredItems = getFilteredItems(query, wines, select);

    const RemoveWine = (wineId)=> {
        axios.delete(`http://localhost:8000/api/redorwhat/${wineId}`)
    
    .then((res)=>{
        const newList = wines.filter((wine,index)=> wine._id !== wineId)
        setWines(newList)
    })
    .catch((err) => {
        console.log(err);
    })
}

    const updateHandle = (id) => {
        navigate(`/edit/${id}`)
    }
    const detailsHandle = (id) => {
        navigate(`/wine/${id}`)
    }
    useEffect(() => {
        axios.get('http://localhost:8000/api/redorwhat')
        .then((res) => {
            setWines(res.data);
            console.log(res.data)
            
        })
        .catch((err) => {
            console.log(err);
        })
        
    }, [])
        
    return (
        <div className='div-list'>
            <h2 >These are all of your products</h2>
            
            
                <label >Search for your product</label>
                <select  onChange={(e) => setSelect(e.target.value)}>
                    <option value={"Name"}>Name</option>
                    <option value={"Type"}>Type</option>
                    <option value={"Place"}>Made In</option>
                </select>
                <input type={'text'} onChange={(e)=> setQuery(e.target.value)} placeholder={'Search...'}/>
                
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Made In</th>
                    <th scope="col" >Actions avaible</th>
                </tr>
            </thead>
        { !query ?
        
            wines.map((wine, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                                <td>{wine.name}</td>
                                <td>{wine.type}</td>
                                <td>{wine.price}</td>
                                <td>{wine.place}</td>
                                <td>
                                        <button onClick={()=>detailsHandle(wine._id)} className="btn btn-dark">Details</button>
                                        <button onClick={()=>updateHandle(wine._id)} className="btn btn-warning">Edit</button>
                                        <button className='btn btn-outline-danger' onClick={()=> RemoveWine(wine._id)}>Delete</button>
                                </td>
                        </tr>
                    </tbody>
                )
            })
        :
        
            filteredItems.map((wine, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                                <td >{wine.name}</td>
                                <td>{wine.type}</td>
                                
                                <td>{wine.price}</td>

                                <td>{wine.place}</td>
                                <td >
                                        <button onClick={()=>detailsHandle(wine._id)} className="btn btn-primary">Details</button>
                                        <button onClick={()=>updateHandle(wine._id)} className="btn btn-primary">Edit</button>
                                        <button className='btn btn-outline-danger' onClick={()=> RemoveWine(wine._id)}>Delete</button>
                                </td>
                        </tr>
                    </tbody>
                )
            })
        }
        </table>
        </div>
    )
}

export default List