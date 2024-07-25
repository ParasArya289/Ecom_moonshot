"use client";
import { useEffect, useState } from "react";
import "../../../styles/auth.css";
import SignUp from "~/components/Signup/Signup";
import Login from "~/components/Login/Login";
import { useAuth } from "~/context/authContext";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

const Auth = () => {
  const [authType, setAuthType] = useState("signup");
  const [checkOtp, setCheckOtp] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(0);
  const [newUser, setNewUser] = useState({});
  const { user } = useAuth();
  useEffect(() => {
    if (user?.fullname) {
      redirect("/");
    }
  }, [user]);
  const onOtpSubmit = (userOtp) => {
    // if (userOtp == generatedOtp) {
    //   createUser(newUser);
    //   navigate("/");
    // } else {
    //   alert("Wrong OTP");
    // }
  };
  return (
    <div className="auth">
      {!user?.name ? (
        <>
          {authType === "login" ? (
            <Login setAuthType={setAuthType} />
          ) : checkOtp ? (
            <Otp digit={8} onOtpSubmit={onOtpSubmit} />
          ) : (
            <SignUp
              setAuthType={setAuthType}
              setCheckOtp={setCheckOtp}
              createOTP={() => {}}
              setGeneratedOtp={setGeneratedOtp}
              setNewUser={setNewUser}
            />
          )}
          {checkOtp && generatedOtp}
        </>
      ) : (
        <>
          <h4 className="user__desc">Hi {user.fullnam} you are logged in.</h4>
          {/* <button className="user__logout" onClick={logout}>
            Logout
          </button> */}
        </>
      )}
    </div>
  );
};
export default Auth;
