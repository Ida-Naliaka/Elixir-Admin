import React, { useEffect, useState } from "react";
import { ActiveTabState } from "../../Context/ActiveTabProvider";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginFailure, loginStart, loginSuccess } from "../../Redux/userRedux";
import { publicRequest } from "../../requestMethods";
import { VisibilityOutlined } from "@material-ui/icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setActiveTab } = ActiveTabState();
  const [show, setShow] = useState(false);
  const [guest, setGuest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all the fields!");
    } else {
      const credentials = { email: email, password: password };
      dispatch(loginStart());
      await publicRequest
        .post("/auth/loginadmin", credentials)
        .then((data) => {
          dispatch(loginSuccess(data.data));
          toast.success("Successfully Logged In");
          navigate("/home");
        })
        .catch((err) => {
          dispatch(loginFailure());
          toast.error("Something went wrong");
        });
    }
  };
useEffect(() => {
  if (guest) {
    setEmail('wafulaida@gmail.com');
    setPassword('zyxwvu@963')
  }
  // eslint-disable-next-line
  },[guest])
  return (
    <div contents-for="login" className="login-div">
      <h1>Login to proceed</h1>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          className="input"
          type="email"
          value={email}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{display:'flex'}}>
          <input
            className="input"
            placeholder="Password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => { setPassword(e.target.value)}}
          />
          <div
            className="passvisibility"
            onClick={(e) => {
              setShow(!show);
              e.preventDefault();
            }}
            >
              <VisibilityOutlined style={{ fontSize: "20px", color: "gray" }} />
            </div>
        </div>
        <div className="buttonbox">
        <button
          className="login-btn"
          type="submit"
          style={{ padding: 10, width: 100 }}
          disabled={isFetching}
        >
          Login
        </button>
         <button
          className="long-btn"
            onClick={(e) => { setGuest(true); e.preventDefault() }}
          style={{ padding: 10, width: 100 }}
          disabled={isFetching}
          >
            Guest user?
          </button>
        </div>
      </form>
      
      <div className="redirect">
        Not a user?{" "}
        <button className="register-btn" onClick={() => setActiveTab("signup")}>
          Register here
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Login;
