import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import { Routes, Route, BrowserRouter, Outlet } from "react-router";
// import About from "./components/Aboutus";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./components/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
const About = lazy(() => import("./components/Aboutus"));
const AppLayout = () => {
  return (
    <Provider store = {appStore}>
      <div className="app">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
};
const Approuter = () => {
const[userInfo,setuserInfo]=useState();
useEffect(()=>{
  //Make an api call and send the username and password
  const data = {
    name:"Default"
  };
setuserInfo(data.name);
},[])

  return (
    <UserContext.Provider value={{ loggedInUser: userInfo, setuserInfo }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            {/* Default route rendering Body */}
            <Route index element={<Body />} />
            <Route
              path="about"
              element={
                <Suspense fallback={<h1>Loading</h1>}>
                  <About />
                </Suspense>
              }
            />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="restaurant/:resid" element={<RestaurantMenu />} />
          </Route>
          {/* Catch-all route for errors */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Approuter />);
