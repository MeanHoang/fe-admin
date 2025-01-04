import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
