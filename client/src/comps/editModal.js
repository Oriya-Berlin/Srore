import React,{useState, useEffect} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';



const EditModal = ({ open, children, onClose, setData , editedItem}) => {


    const [title, setTitle] = useState(editedItem.title);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(editedItem.image);


    useEffect( () => {

        setTitle(editedItem.title);
        setPrice(editedItem.price);
        setDescription(editedItem.description);
        setImage(editedItem.image);
    },[editedItem.title]);


    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '50px',
        zIndex: 1000
      }
      
      const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .7)',
        zIndex: 1000
      }

      const formStyle = {
        margin: "3rem auto",
        padding: "4rem",
        width: "32rem",
    }



      const submitNewProduct = () => {

        const updatedProduct = {
            title,
            price,
            description,
            image
        };
        
        axios.put(`/admin/update/${editedItem._id}`, updatedProduct)
        .then( res => console.log(res.data))
        .catch(err => console.log(err));

        // // Clear the fields
        setTitle('');
        setPrice(0);
        setDescription('');
        setImage('');


        // remove it from the list
        setData(prev => prev.filter(item=> item._id !== editedItem._id));
        // add it to the list updated
        setData(prev => [...prev, updatedProduct])

        onClose();

    };




      if (!open) return null; 




      return ReactDom.createPortal(
          <>
              <div style={OVERLAY_STYLES} />
  
              <div style={MODAL_STYLES}>
  
                  <div className="container bg-light" style={formStyle}>
  
                  <h1>Add Product</h1>
  
                      <form onSubmit={submitNewProduct}  method='post' encType="multipart/form-data">
  
                          <div className="mb-3">
                              <label className="form-label">Title:</label>
                              <input value={title} onChange={e => setTitle(e.target.value)}  type="text" className="form-control" />
                          </div>
                          <div className="mb-3">
                              <label className="form-label">Price:</label>
                              <input value={price} onChange={e => setPrice(e.target.value)}  type="number" className="form-control" />
                          </div>
                          <div className="mb-3">
                              <label className="form-label">Description:</label>
                              <input value={description} onChange={e => setDescription(e.target.value)}  type="text" className="form-control" />
                          </div>
                          <div className="mb-3">
                              <label className="form-label">Image:</label>
                              <input value={image} onChange={e => setImage(e.target.value)}  type="text" className="form-control" />
                          </div>
                          
          
                          <button type="submit" className="btn btn-primary">Add</button>
                      </form>
                  
                  </div>
  
              </div>
          </>,
          document.getElementById('modal')
      );
  
}




export default EditModal;
