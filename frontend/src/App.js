import {  Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm";
import "./styles.css";
import './App.css';
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    
    <div>
       
       <Navbar />
         <Routes>
            <Route path="/" element={ <UserForm/> } /> 
            <Route path="/admin" element={ <AdminDashboard/> } /> 
      
         </Routes>
    </div>
  );
}

export default App;
