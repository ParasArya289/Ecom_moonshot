"use client";
import { CiSearch, CiShoppingCart } from "react-icons/ci";

import "../../styles/navbar.css";
import { useAuth } from "~/context/authContext";
import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
  const [mounted, setMounted] = useState(true);
  const { user } = useAuth();
  // useEffect(() => setMounted(true), []);
  return (
    mounted && (
      <nav className="navbar">
        <h3>ECOMMERCE</h3>
        <div className="links1">
          <a href="#">Categories</a>
          <a href="#">Sales</a>
          <a href="#">Clearance</a>
          <a href="#">New Stock</a>
          <a href="#">Trending</a>
        </div>
        <div className="links2">
          <a href="#">Help</a>
          <a href="#">Orders & Returns</a>
          <Link href="/user">{user?.fullname ? user.fullname : "Login"}</Link>
        </div>
        <div className="usefull_links">
          <div className="links3">
            <a href="#">
              <CiSearch />
            </a>
            <a href="#">
              <CiShoppingCart />
            </a>
          </div>
        </div>
        <div className="offer">
          <p>Get 10% of on buisness sing up</p>
        </div>
      </nav>
    )
  );
}

export default Navbar;
