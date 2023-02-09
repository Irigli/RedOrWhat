import React, {useState, useEffect} from 'react';
import { useParams, Link} from 'react-router-dom';
import axios from 'axios';


const Display = () => {
    const {id} = useParams();

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [place, setPlace] = useState('')
    const [description, setDescription] = useState('');
    const [productId, setProductId] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/redorwhat/'+id)
        .then((res) => {
            console.log(res.data.name, 'this is the wine');
            setName(res.data.name);
            setType(res.data.type);
            setPrice(res.data.price);
            setImage(res.data.image);
            setPlace(res.data.place);
            setDescription(res.data.description);
            setProductId(res.data._id);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className='div-display'>
            
            <h2>Details about: {name}</h2>
            <div className='galery'>
                <div className='content1'>
                    {
                        image?
                        <div  >
                            <img src={image}/>
                        </div>
                        : <p>You havent uploaded an image for this product</p>
                    }
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <p>Type: {type}</p>
                    <p>Made In: {place}</p>
                    <h6>Price: ${price}</h6>
                    <button ></button>

                </div>
            </div>
            
            <Link className={'btn btn-dark'} to={'/wines'}>Back to the list of wines</Link>

        </div>
    )
}

export default Display