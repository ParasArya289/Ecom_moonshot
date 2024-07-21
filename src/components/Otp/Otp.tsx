// @ts-nocheck 
import React, { useRef, useState } from "react";
import "../../styles/Otp.css";

const Otp = ({ digit, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(digit).fill(""));

  const inputRefs = useRef([]);
  const formRef = useRef(null);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    console.log(otp.join(""));
    onOtpSubmit(otp.join(""));
  };
  const handleChange = (e, i) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[i] = value.substring(value.length - 1);
    setOtp(newOtp);
  };
  const handleKeyDown = (e, i) => {
    const keyPressed = e.key;
    
    if (e.key && e.key !== "Backspace" && e.key !== "Enter") {
        const inputValue = e.target.value;
        if (inputValue.length === 1 && inputRefs.current[i + 1]) {
            inputRefs.current[i + 1].focus();
        }
    }
    // if (keyPressed === "Backspace") {
    //   if (i+1 === digit) {
    //     inputRefs.current[i].value = "";
    //     inputRefs.current[i - 1].focus();
    //   } else if (i < digit && inputRefs.current[i - 1]) {
    //     inputRefs.current[i - 1].focus();
    //   }
    // }
  };
  return (
    <div className="otp">
      <h4>Verify your OTP</h4>
      <h5>Enter the 8 digit OTP</h5>
      <form ref={formRef} onSubmit={handleOtpSubmit}>
        <div className="input__container">
          {otp.map((val, i) => (
            <input
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
        <button type="submit">VERIFY</button>
      </form>
    </div>
  );
};

export default Otp;