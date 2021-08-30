import React,{useState, useEffect} from 'react';
import axios from 'axios';
import AddModal from './addModal';
import EditModal from './editModal';



const Admin = () => {

    const [data, setData] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedItem, setEditedItem] = useState({});



    useEffect( () => {

        axios.get('/admin')
        .then( res => setData(res.data))
        .catch(err => console.log(err))

    },[]);



    function addNewProduct() {
        setIsAddModalOpen(true);
    };



    function editProduct(item) {
        setEditedItem(item);
        setIsEditModalOpen(true);
    };



    function deleteProduct(item_id) {
        axios.delete(`/admin/delete/${item_id}`)
        .then(res => console.log('Product has been deleted!'))
        .catch(err => console.log(err))

        const newData = data.filter(item=> item._id !== item_id);
        setData(newData);
    }



    return(
        <div>

                <div>        
                    <div className="card-body">
                        <h2 className="card-title">Admin Page</h2>
                        <p className="card-text">Click here for add a new product</p>
                        <button onClick={() => {addNewProduct()}} className="btn btn-primary">Add</button>
                    </div>             
                </div>



                <table className="table">

                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                            <th scope="col">Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((item,key) => {
                                return(
                                <tr key={item._id}>
                                    <th scope="row">{key+1}</th>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>
                                         <button onClick={() => {editProduct(item)}}>Edit</button>
                                         <button onClick={() => {deleteProduct(item._id)}}>Delete</button>
                                    </td>
                                </tr>
                                )
                            })
                        }

                    </tbody>

                </table>


                <AddModal 
                    open={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    setData={setData}>
                </AddModal>


                <EditModal 
                    open={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    setData={setData}
                    editedItem={editedItem}>
                </EditModal>

        </div>
    );
};





export default Admin;