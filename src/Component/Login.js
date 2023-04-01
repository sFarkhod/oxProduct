import React, { useState, useEffect } from "react";
import "./Css/Login.css";
import { Button, Divider, Form, Input, Typography, message } from "antd";
import {
  FacebookFilled,
  GoogleOutlined,
  InstagramFilled,
  InstagramOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const subdomain = "toko";
  const navigate = useNavigate();
  // const [error, setError] = useState("");



  async function loginSubmit() {
    const responce = await fetch(
      "https://toko.ox-sys.com/security/auth_check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          _username: username,
          _password: password,
          _subdomain: subdomain,
        }),
      }
    );

    const data = await responce.json();

    if (data) {
      if (data.message) {
        message.error(data.message)
      } else {
        localStorage.setItem("tokenForOx", data.token);
        message.success("Login Successful")
        navigate("/home");
      }
    }
  }

  return (
    <>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div className="Login">
        <Form className="bgLogin" onFinish={loginSubmit}>
          <Typography.Title>Welcome to Ox System</Typography.Title>
          <Form.Item label="Username" name={"Username"}>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Password" name={"Password"}>
            <Input
              placeholder="Enter your username"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
          <Divider style={{ borderColor: "black" }}>or Login With</Divider>
          <div className="socialIcons">
            <GoogleOutlined style={{ color: "red" }} />
            <FacebookFilled style={{ color: "#4267B2" }} />
            <InstagramOutlined style={{ color: "#C13584" }} />
          </div>
        </Form>
      </div>
    </>
  );
}
