import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("dohni428@gmail.com");
  const [password, setpassword] = useState("Virat@123");
  const [error , setError ] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
       try {
        const res  = await axios.post(BASE_URL+"/login" , {
            emailId,
            password,
        },{withCredentials : true});
        // console.log(res.data)

        dispatch(addUser(res.data));
        return navigate("/")
       } catch (err) {
        setError(err?.response?.data || "Something Went Worng");
        //  console.error(err);
       }
  }

  return (
    <div className="flex justify-center my-20 ">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title  flex justify-center">Login</h2>
          <div className="">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="email"
                value={emailId}
                className="input"
                placeholder="Email Id"
                onChange={(e)=> setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input"
                placeholder="Password"
                onChange={(e)=> setpassword(e.target.value)}
              />
            </fieldset>
            <p className="text-red-500">{ error }</p>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
