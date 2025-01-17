import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-around bg-blue-600 p-4 text-white text-lg">
      <Link to="/" className="hover:underline">
        Upload User Data
      </Link>
      <Link to="/admin" className="hover:underline">
        Admin
      </Link>
    </nav>
  );
}

export default Navbar;
