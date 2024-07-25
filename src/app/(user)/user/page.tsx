"use client";

import { useAuth } from "~/context/authContext";
import "../../../styles/auth.css";
import { redirect } from "next/navigation";

const User = () => {
  const { user, logout } = useAuth();
  if (!user?.fullname) {
    redirect("/auth");
  }
  return (
    <>
      <h4 className="user__desc">Hi {user?.fullnam} you are logged in.</h4>
      <button className="user__logout" onClick={logout}>
        Logout
      </button>
    </>
  );
};
export default User;
