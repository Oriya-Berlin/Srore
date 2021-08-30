import React,{useState} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';




const AddModal = ({ open, children, onClose, setData }) => {


    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


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

        const newProduct = {
            title,
            price,
            description,
            image
        };
        

        axios.post('/admin/create', newProduct)
        .then( res => console.log(res.data))
        .catch(err => console.log(err));

        // Clear the fields
        setTitle('');
        setPrice(0);
        setDescription('');
        setImage('');


        setData(prev => [...prev,newProduct])
        onClose();

    };




    if (!open) return null; 




    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES} />

            <div style={MODAL_STYLES}>

                <div className="container bg-light" style={formStyle}>

                <h1>Add Product</h1>

                    <form onSubmit={submitNewProduct} encType="multipart/form-data">

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






};


export default AddModal;