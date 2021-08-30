import React,{useEffect, useState, useContext} from 'react';
import cartContext from './../context/cartContext'
import Navbar from './navbar';
import axios from 'axios';




const Cart = () => {

    const {items, setItems} = useContext(cartContext);



    function pay(){
        
        //
        items.forEach(item => {

            let product = {
                product_id: item._id,
                price: item.price
            }

            axios.post('/stats/add', product)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        })

        // inserting the items id to a set to avoid duplicates
        let uniqueItems = new Set();
        items.forEach((item) => uniqueItems.add(item._id));
        
        uniqueItems.forEach( item => {

            axios.put('/stats/addunique', {product_id: item})
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        });



        //clear the cart
        setItems([]);
    }


    return(
        <div>
            <Navbar/>
            <h1>Cart</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        items.map((item,key) => {
                            return(
                                <tr key={item._id}>
                                    <th scope="row">{key+1}</th>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                </tr>
                                )
                            })
                    }

                </tbody>
            </table>

            <h1>Total Price:  {items.reduce((sum,item) => sum + item.price ,0)}</h1>
            <button onClick={() => pay()} className="btn btn-primary">Pay</button>
        </div>
    );
};


export default Cart;


