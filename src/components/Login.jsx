import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data)

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Worng");
      //  console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false); 
        
      }, 2000);
      setTimeout(() => {
       dispatch(addUser(res.data.data));
       return  navigate("/profile")
      }, 2000);
     
       
    } catch (err) {
      // console.error(err);
     setError(err?.response?.data || "Something Went Worng");
    }
  };

  return (
    <div className="flex justify-center my-20 ">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Account Created successfully.</span>
          </div>
        </div>
      )}
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title  flex justify-center">
            {isLoggedIn ? "Login" : "Sign Up"}
          </h2>
          <div className="">
            {!isLoggedIn && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="email"
                    value={lastName}
                    className="input"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                value={emailId}
                className="input"
                placeholder="Email Id"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{error}</p>
          </div>
          <div className="card-actions justify-center py-5">
            <button
              className="btn btn-primary"
              onClick={isLoggedIn ? handleLogin : handleSignUp}
            >
              {isLoggedIn ? "login" : "signUp"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer pb-5"
            onClick={() => setIsLoggedIn((value) => !value)}
          >
            {isLoggedIn ? "New User. SignUp Here" : "Already User. Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
