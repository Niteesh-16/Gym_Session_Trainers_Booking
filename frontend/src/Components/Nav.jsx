
import React, { useState } from "react";
import logo from "../assets/explosivefitness.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Nav = ({ nav }) => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  // Default: not admin
  let isAdmin = false;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      isAdmin = decoded.role === "admin";
    } catch {
      isAdmin = false;
    }
  }

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Contact", to: "/contact-us" },
    ...(isLoggedIn
      ? [
          isAdmin
            ? { label: "Dashboard", to: "/admin/dashboard" }
            : { label: "Profile", to: "/profile" },
        ]
      : []),
  ];

  return (
    <header className={`w-full ${nav ? "fixed top-0 bg-black z-80" : "absolute"}`}>
      <nav className="max-w-[1540px] m-auto py-6 px-6 max-lg:px-12 flex justify-between items-center gap-14 max-xl:gap-5 max-sm:py-4 max-sm:px-6">
        <Link to="/" className="cursor-pointer font-semibold text-l flex justify-center items-center gap-1">
          <img src={logo} alt="logo" width={120} height={120} className="ml-10 rounded-full" />
        </Link>
        <ul className="flex flex-1 justify-end gap-10 max-xl:gap-7 max-lg:flex-col ...">
          {navLinks.map(({ label, to }) => (
            <li key={label} className="text-white hover:text-[#00d9ff] ...">
              <Link to={to} onClick={() => setOpenNav(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        {!isLoggedIn ? (
          <button
            onClick={() => navigate("/registration")}
            className="py-2 px-7 text-sm font-semibold rounded-lg bg-primary text-white transition max-lg:hidden hover:[box-shadow:0_0_12px_2px_rgba(0,217,255,0.25)] hover:bg-[#00bcd4]"
          >
            REGISTER
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="py-2 px-7 text-sm font-semibold rounded-lg bg-primary text-white transition max-lg:hidden hover:[box-shadow:0_0_12px_2px_rgba(0,217,255,0.25)] hover:bg-[#00bcd4]"
          >
            LOGOUT
          </button>
        )}
      </nav>
    </header>
  );
};

export default Nav;
