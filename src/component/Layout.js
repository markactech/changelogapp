import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Add from "../Add";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import SearchInput from '../SearchInput'
import Footer from "./Footer ";
function Layout() {
  const navigate = useNavigate();
  const handlesetting = () => {
    navigate("/setting");
  };
  return (
    <>
      <nav class="  navbar-light bg-light border-bottom  navbar sticky-top bg-body-tertiary">
       
          <h3 className="ms-5 x-5 mt-2 mb-3">Orion </h3>
          <div className="adddbutton">
        <Add  /> 
        <button className="btn btn-secondary ms-3 mt-2" onClick={handlesetting}>Setting</button>
        </div>
      </nav>
      
       
     

      <Outlet />
     
    </>
  );
}

export default Layout;
