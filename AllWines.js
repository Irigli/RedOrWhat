import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

    const filter = (query, products, select) => {
        if(!query){
            return products
        }
        else if (select==="Type"){
            return products.filter((products) => products.type.includes(query));
        }
        else if (select==="Place"){
            
            return products.filter((products) => products.place.includes(query));

            
        }
        return products.filter((products) => products.name.includes(query));
    };

const Products = (props) => {
    const {name, productId} = props;
    const [wines, setWines] = useState([]);
    const [query, setQuery] = useState(''); 
    const [select, setSelect] = useState('');
    const navigate = useNavigate();

    const filteredItems = filter(query, wines, select);


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

    return (
        <div className='div-list'>
            <h2>Welcome to the Wine Paradice</h2>
            
            <label>Search for wines by:</label>
            <select onChange={(e) => setSelect(e.target.value)}>
                <option value={"Name"}>Name</option>
                <option value={"Type"}>Type</option>
                <option value={"Place"}>Place</option>
            </select>
            <input type={'text'} onChange={(e)=> setQuery(e.target.value)} placeholder={'Search...'}/>
            
        <div className='galery' >
        
        { !query ?
        
            wines.map((wine, index) => {
                
                
                return (
                    <div className='content1' key={index}>
                        <img src={wine.image}/>
                        <h3>{wine.name}</h3>
                        <p>{wine.description}</p>
                        <p>Made In: {wine.place}</p>
                        <h6>${wine.price}</h6>
                        <button className='btn btn-outline-danger' onClick={()=> RemoveWine(wine._id)}>Buy Wine</button>
                        <NavLink to={"/wine/:id"}></NavLink>
                    </div>
                )
            })
        :
        
            
            filteredItems.map((wine, index) => {
                return (
                    <div className='content1' key={index}>
                        <img src={wine.image}/>
                        <h3>{wine.name}</h3>
                        <p>{wine.description}</p>
                        <p>Made In: {wine.place}</p>
                        <h6>${wine.price}</h6>
                        <button className='btn btn-outline-danger' onClick={()=> RemoveWine(wine._id)}>Buy Wine</button>
                        <NavLink to={"/wine/:id"}></NavLink>
                    </div>
                )
            })
        }
        </div>

        </div>
    )
}

export default Products