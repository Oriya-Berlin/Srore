import React,{useContext} from 'react';
import cartContext from './../context/cartContext'



const Item = ({item}) => {

    const {items, setItems} = useContext(cartContext);



    function addToCart() {
        // todo: how to add an item
        console.log('kkkkkkkkkkkkkkkkkkkkk')

        setItems([...items, item]);
        console.log(items)
    };


    const imageStyle = {
        width: '200px',
        height: '100px'
    }


    return(
        <div className="card">
            <div className="card m-1" >
                <img src={item.image} className="card-img-top" alt="..." style={imageStyle}/>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">{item.price}$</p>
                    <button onClick={() => addToCart()}  className="btn btn-primary">Add</button>
                </div>            
            </div>
        </div>
    );
}

export default Item;
