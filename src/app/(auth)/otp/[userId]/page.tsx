"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../../../styles/otp.css";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "~/context/authContext";

const Otp = ({ digit = 6 }) => {
  const params = useParams();
  const [otp, setOtp] = useState(new Array(digit).fill(""));
  const [verificationLoading, setVerificationLoading] = useState(false);
  const { user,setUser } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user?.fullname) {
      router.replace("/");
    }
  }, []);

  const inputRefs = useRef([]);
  const formRef = useRef(null);

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setVerificationLoading(true);
    try {
      console.log(params.userId, parseInt(otp.join("")));
      const res = await axios.post("/api/verify-user", {
        id: params.userId,
        otp: parseInt(otp.join("")),
      });
      setUser(res.data.user);
      router.replace("/");
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = axiosError.response?.data.message ?? "Signup failed";
      alert(errorMessage)
      console.error(error.message);
    } finally {
      setVerificationLoading(false);
    }
  };
  const handleChange = (e, i) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[i] = value.substring(value.length - 1);
    setOtp(newOtp);
  };
  const handleKeyDown = (e, i) => {
    const keyPressed = e.key;
    const inputValue = e.target.value;
    if (e.key && e.key !== "Backspace" && e.key !== "Enter") {
      const inputValue = e.target.value;
      if (inputValue.length === 1 && inputRefs.current[i + 1]) {
        inputRefs.current[i + 1].focus();
      }
    }
    // if (keyPressed === "Backspace") {
    //   if (!inputValue && i < digit && inputRefs.current[i - 1]) {
    //     inputRefs.current[i - 1].focus();
    //   } else {
    //     inputRefs.current[i].value = "";
    //   }
    // }
  };
  return (
    <div className="otp">
      <h4>Verify your OTP</h4>
      <h5>Enter the {digit} digit OTP</h5>
      <form ref={formRef} onSubmit={handleOtpSubmit}>
        <div className="input__container">
          {otp.map((val, i) => (
            <input
              disabled={verificationLoading}
              type="text"
              ref={(input) => (inputRefs.current[i] = input)}
              key={i}
              name={i}
              value={val}
              autoFocus={i === 0}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              required
            />
          ))}
        </div>
        <button disabled={verificationLoading} type="submit">
          {verificationLoading ? "Loading..." : "VERIFY"}
        </button>
      </form>
    </div>
  );
};

export default Otp;
