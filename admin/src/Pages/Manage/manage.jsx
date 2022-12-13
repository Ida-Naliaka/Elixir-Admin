import axios from 'axios'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './manage.css';
import {useNavigate, Link} from 'react-router-dom';
import { logout } from '../../Redux/userRedux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manage = () => {
    const dispatch=useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const navigate=useNavigate();
    const handleDelete=async()=>{
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
        await axios.delete(`/api/users/admin/${user._id}`, config).then((res)=>{
          dispatch(logout());
          navigate('/')
        }).catch((error)=>{
          toast.error(error)
        })
      }
  return (
    <div className="wrapper">
        <div className="addproduct">
            <div className='manageproducts'>
                <h3>Manage Users</h3></div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', height: 'fit-content'}}>
                    <div className='addNew'>
                    Delete this Account
                    <button className="userAddButton" onClick={()=>handleDelete()}>Delete User</button>
                    </div>
                    </div>
                    </div>
        <div className="addproduct">
            <div className='manageproducts'>
                <h3>Manage Products</h3></div>
                <div className='addNew'>
                    Add new Product
                    <Link to="/newproduct">
                        <button className="userAddButton">Add Product</button>
                        </Link>
                        </div>
                        </div>
                        <ToastContainer position="top-center"
                        autoClose={2000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"/>
            </div>
  )
}

export default Manage
