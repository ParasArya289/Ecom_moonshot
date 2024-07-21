// @ts-nocheck 
'use client'
import React, { useRef } from "react";
import "../../styles/authForms.css";
const SignUp = ({
  setAuthType,
  setCheckOtp,
  setGeneratedOtp,
  createOTP,
  setNewUser,
}) => {
  const formRef = useRef(null);
//   const handFormSubmit = (e) => {
//     e.preventDefault();
//     const formData = new FormData(formRef.current);
//     const data = {};
//     for (let [key, value] of formData.entries()) {
//       data[key] = value;
//     }
//     setCheckOtp(true);
//     setGeneratedOtp(createOTP(8));
//     setNewUser(data);
//   };
  return (
    <div className="singup auth_form">
      <h4>Create Your Account</h4>
      <form ref={formRef} onSubmit={'handFormSubmit'}>
        <label htmlFor="name">
          Name
          <input type="text" name="name" placeholder="Enter" required />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="Enter" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="text" name="password" placeholder="Enter" required />
        </label>
        <button type="submit">CREATE ACCOUNT</button>
      </form>
      <hr />
      <p>
        Have an Account?{" "}
        <button onClick={() => setAuthType("login")}>LOGIN</button>
      </p>
    </div>
  );
};

export default SignUp;