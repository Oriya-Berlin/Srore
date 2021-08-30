import React,{useEffect, useState, useContext} from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Item from './item';
import cartContext from './../context/cartContext'


const Home = () => {

    const [data, setData] = useState([]);

    // TODO: put that on item comp
    const {items, setItems} = useContext(cartContext);


    useEffect(() => {

        axios.get('/home')
        .then( res => setData(res.data))
        .catch(err => console.log(err))

        // console.log(data)
    },[]);


    return(
        <div>
            <Navbar/>

            <div className="card-grid">
            {
                data.map((item,key) => <Item item={item} key={key}/>)
            }
            </div>

        </div>
    );

}

export default Home;