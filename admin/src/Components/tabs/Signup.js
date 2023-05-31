import React, { useState } from "react";
import { ActiveTabState } from "../../Context/ActiveTabProvider";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { publicRequest } from "../../requestMethods";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [show, setShow] = useState(false);

  const { setActiveTab } = ActiveTabState();
  const handleSubmit = async () => {
    const paswd = new RegExp("(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !title ||
      !phone ||
      !location
    ) {
      toast.warning("Please Fill all the Fields.");
    }
    if (password.match(paswd)) {
      if (password !== confirmPassword) {
        toast.warning("Passwords Do Not Match!");
      }
      try {
        await publicRequest
          .post(`/auth/registeradmin`, {
            name,
            email,
            password,
            title,
            phone,
            location,
          })
          .then(() => {
            toast.success("Successfully Signed Up.Please Verify your Email");
          });
      } catch (error) {
        toast.error(`${error.message}`);
      }
    } else {
      toast.warning("Please Set a Stronger Password!");
    }
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User Registration</h1>
      <form
        className="newUserForm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="newUserItem">
          <input
            type="text"
            value={name}
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <input
            type="email"
            placeholder="john@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <div className="passinput">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="password"
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              {show ? "Hide" : "Show"}
            </div>
          </div>
        </div>
        <div className="newUserItem">
          <div className="passinput">
            <input
              type={show ? "text" : "password"}
              placeholder=" Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="password"
              onClick={(e) => {
                setShow(!show);
                e.preventDefault();
              }}
            >
              {show ? "Hide" : "Show"}
            </div>
          </div>
        </div>
        <div className="newUserItem">
          <input
            type="text"
            placeholder="Title. eg. Manager"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="newUserItem">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button className="newUserButton" type="submit">
          Create
        </button>
        <div style={{ display: "flex" }} className="redirect">
          Already have an account?
          <button
            className="register-btn"
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>{" "}
        </div>
      </form>
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
export default Signup;
