"use client";
import React, { useRef, useState } from "react";
import "../../styles/authForms.css";
import axios from "axios";
import { useRouter } from "next/navigation";
const SignUp = ({ setAuthType }) => {
  const formRef = useRef(null);
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const router = useRouter();
  // const {setUser} = useAuth();
  const signup = async (userCred) => {
    setIsSignUpLoading(true);
    try {
      const res = await axios.post("/api/signup", userCred);
      router.replace(`/otp/${res.data.userId}`);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsSignUpLoading(false);
    }
  };
  const handFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    console.log(data);
    signup(data);
  };
  return (
    <div className="singup auth_form">
      <h4>Create Your Account</h4>
      <form ref={formRef} onSubmit={handFormSubmit}>
        <label htmlFor="fullname">
          Name
          <input type="text" name="fullname" placeholder="Enter" required />
        </label>
        <label htmlFor="email">
          Email
          <input type="email" name="email" placeholder="Enter" required />
        </label>
        <label htmlFor="password">
          Password
          <input type="text" name="password" placeholder="Enter" required />
        </label>
        <button disabled={isSignUpLoading} type="submit">
          {isSignUpLoading ? "Loading.." : "CREATE ACCOUNT"}
        </button>
      </form>
      <hr />
      <p>
        Have an Account?{" "}
        <button disabled={isSignUpLoading} onClick={() => setAuthType("login")}>
          LOGIN
        </button>
      </p>
    </div>
  );
};

export default SignUp;
