import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Add from "../Add";
import "./Header.css";

import SearchInput from '../SearchInput'
function Layout() {
  return (
    <>
      <nav class="navbar navbar-light bg-light border-bottom">
       
          <h3 className="ms-5 x-5 mt-2 mb-3">Orion ChangeLog</h3>
          <div className="adddbutton">
        <Add  />
        </div>
      </nav>
      
       
      <Header/>

      <Outlet />
    </>
  );
}

export default Layout;
