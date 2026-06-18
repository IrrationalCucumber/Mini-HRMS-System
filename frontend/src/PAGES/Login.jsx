/* TODO
  Error handling for login
*/

import React, { useState } from "react";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  //login cred variable for admin
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL; //|| 'http://localhost:8800/admin/login';
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (loginCred.email !== "" && loginCred.password !== "") {
        //const res = await axios.post(`${apiUrl}/admin/login`, loginCred);
        //console.log(res.data);
        navigate("/dashboard");
      } else {
        return alert("Invalid Email/Password");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            id="email"
            value={loginCred.email}
            onChange={(e) =>
              setLoginCred({ ...loginCred, email: e.target.value })
            }
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            id="password"
            value={loginCred.password}
            onChange={(e) =>
              setLoginCred({ ...loginCred, password: e.target.value })
            }
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
