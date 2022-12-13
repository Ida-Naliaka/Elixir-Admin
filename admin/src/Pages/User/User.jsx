import {
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@material-ui/icons";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
  import { Link, useNavigate } from "react-router-dom";
  import "./User.css";
  import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from "../../Redux/userRedux";
  
  export default function User() {
    const user = useSelector((state) => state.user.currentUser);
    const [name, setName]= useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber]= useState("");
    const [location, setLocation] = useState("");
    const dispatch= useDispatch();
    const navigate= useNavigate();
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

    const handleSubmit= async(e)=>{
      e.preventDefault();
          if(!email || !phoneNumber || !location || !name) {
            alert( 'Please provide Input.')
            return;
          }
            try {
              const config={
                headers: {
                  "Content-type": "application/json",
                }
              }
              await axios.put(`/api/user/updateadmin`, 
              {
                userId: user._id,
                name:name,
                email: email,
                phone: phoneNumber, 
                location: location}, config)
              alert('Successfully Updated your Details!');
            } catch (error) {
             alert('Error Occured')
            }
    }
    return (
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">Edit User</h1>
          <Link to="/">
            <button className="userAddButton">Create</button>
            
          </Link>
          <button className="userAddButton" onClick={()=>handleDelete()}>Delete User</button>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={user.pic}
                alt={user.name}
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.name}</span>
                <span className="userShowUserTitle">{user.title}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.name}</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{user.phone}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{user.location}</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    placeholder={user.name}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    placeholder={user.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e)=>{setPhoneNumber(e.target.value)}}
                    placeholder={user.phone}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e)=>{setLocation(e.target.value)}}
                    placeholder={user.location}
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src= {user.pic}
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" onClick={()=>{handleSubmit()}}>Update</button>
              </div>
            </form>
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
    );
  }