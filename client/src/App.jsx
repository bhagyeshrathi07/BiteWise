import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './routes/SignIn';
import Register from './routes/Register';
import Shop from "./routes/Shop";
import Home from "./routes/Home";

export default function(){
  return(
    <Router>
      {/* Place routes here with exact file path */}
      <Routes>
        <Route exact path="/SignIn" element={<SignIn />}/>
        <Route exact path="/Register" element={<Register />}/>
        <Route exact path="/Home" element={<Home />}/>
        <Route exact path="/Shop" element={<Shop />} />
      </Routes>
    </Router>
  )
}