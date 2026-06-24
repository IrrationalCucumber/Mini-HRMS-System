import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Input, Stack } from "@mui/joy";

import { Email, Lock, Login as LoginIcon } from "@mui/icons-material";
import TitleText from "../COMPONENT/Text";
import ButtonComp from "../COMPONENT/Button";

const Login = () => {
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (loginCred.email && loginCred.password) {
        const response = await axios.post(`${apiUrl}/login`, loginCred);
        if (response.status === 200 && response.data) {
          navigate("/dashboard");
        } else {
          alert("Invalid Email or Password");
        }
      } else {
        alert("Please enter both email and password.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f8fc",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: 400,
          p: 4,
          boxShadow: "lg",
        }}
      >
        <Stack spacing={2}>
          <TitleText
            level="h2"
            textAlign="center"
            color="primary"
            content="Mini-HRMS"
          />
          <TitleText
            level="body-md"
            textAlign="center"
            content="Administrator Login"
          />

          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <Input
                startDecorator={<Email />}
                placeholder="Email Address"
                type="email"
                value={loginCred.email}
                onChange={(e) =>
                  setLoginCred({
                    ...loginCred,
                    email: e.target.value,
                  })
                }
              />

              <Input
                startDecorator={<Lock />}
                placeholder="Password"
                type="password"
                value={loginCred.password}
                onChange={(e) =>
                  setLoginCred({
                    ...loginCred,
                    password: e.target.value,
                  })
                }
              />
              <ButtonComp
                type="submit"
                size="lg"
                startDecorator={<LoginIcon />}
                content="Login"
              />
            </Stack>
          </form>
        </Stack>
      </Card>
    </div>
  );
};

export default Login;
