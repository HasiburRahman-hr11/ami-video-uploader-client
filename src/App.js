import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./Pages/NotFound/NotFound";
import SignIn from "./Pages/SignIn/SignIn";
import Dashboard from "./Pages/Dashboard/Dashboard";


const App = () => {

 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
