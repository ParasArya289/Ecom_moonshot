// @ts-nocheck 
'use client'
import React, { useRef } from "react";
import "../../styles/authForms.css";
const Login = ({ setAuthType }) => {
  const formRef = useRef(null);
//   const { login } = useEcommerceData();
//   const handleLogin = (e) => {
//     e.preventDefault();
//     const formData = new FormData(formRef.current);
//     const data = {};
//     for (let [key, value] of formData.entries()) {
//       data[key] = value;
//     }
//     login(data);

//   };
  return (
    <div className="login auth_form">
      <h4>Login</h4>
      <h5>Welcome back to ECOMMERCE</h5>
      <h6>The next gen business marketplace</h6>
      <form ref={formRef} onSubmit={'handleLogin'}>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="Enter" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="text" name="password" placeholder="Enter" required />
        </label>
        <button type="submit">LOGIN</button>
      </form>
      <hr />
      <p>
        Don't have an Account?{" "}
        <button onClick={() => setAuthType("signup")}>SIGN UP</button>
      </p>
    </div>
  );
};

export default Login;