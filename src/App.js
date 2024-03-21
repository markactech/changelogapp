import React, { useState } from "react";
 
import ViewForm from "./ViewForm";
  
import {  Route, Routes } from "react-router-dom";
import form from './AddLogForm'
import AddLogForm from "./AddLogForm";
import Layout from "./component/Layout";
import Header from "./Header";

function App() {
  
  return (
       <Routes> 
        <Route path="/" exact  element={<Layout/>}>
        {/* <Route path="/form" exact  element={<Form/>}/>= */}
        <Route path="/" exact  element={<ViewForm/>}/>
        <Route path="/addlogs" exact  element={<AddLogForm/>}/>
        <Route path="/preview/id" exact  element={<AddLogForm/>}/>
        </Route>
       
      </Routes>
    
   );
}

export default App;
