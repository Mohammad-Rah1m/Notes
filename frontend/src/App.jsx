import { useState } from "react";
// import reactLogo from './assets/react.svg'
import viteLogo from "/vite.svg";
// import './App.css'
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import NoteDetail from "./pages/NoteDetail";
import { toast } from "react-hot-toast";
import Navbar from "./components/Navbar";


function App() {
  
  return (
    <div className="">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
}

export default App;
