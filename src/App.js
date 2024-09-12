import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file
import Employee from "./Employee";
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Employee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
