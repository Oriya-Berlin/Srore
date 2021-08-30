import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route} from 'react-router-dom';
import './app.css';


// Components
import Admin from './comps/admin';
import Home from "./comps/home";
import Cart from './comps/cart'
import Stats from "./comps/stats";

// Cart context
import cartContext from "./context/cartContext";



function App() {

  const [items, setItems] = useState([]);


  return (
    <div>

      <Route exact path="/admin" component={Admin}/>
      <Route exact path="/stats" component={Stats}/>


      <cartContext.Provider value={{items, setItems}}>
  
          <Route exact path="/home" component={Home}/>
          <Route exact path="/home/cart" component={Cart}/>

      </cartContext.Provider>
    </div>
  );
}

export default App;
