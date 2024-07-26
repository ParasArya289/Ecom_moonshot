"use client";
import { useEffect, useState } from "react";
import "../../../styles/auth.css";
import SignUp from "~/components/Signup/Signup";
import Login from "~/components/Login/Login";
import { useAuth } from "~/context/authContext";
import { redirect } from "next/navigation";

const Auth = () => {
  const [authType, setAuthType] = useState("signup");
  const { user } = useAuth();
  useEffect(() => {
    if (user?.fullname) {
      redirect("/");
    }
  }, [user]);
  return (
    <div className="auth">
      {!user?.name ? (
        <>
          {authType === "login" ? (
            <Login setAuthType={setAuthType} />
          ) : (
            <SignUp setAuthType={setAuthType}/>
          )}
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
