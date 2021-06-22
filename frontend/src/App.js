import React, { useCallback, useEffect } from "react";

import { useSelector } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import MainNavigation from "./shared/Navigation/MainNavigation";
import Pets from "./pet/page/Pets";
import HomePage from "./homepage/HomePage";
import Favorite from "./user/page/Favorite";
import PetDescription from "./pet/page/PetDescription";
import UserProfil from "./user/page/UserProfil";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import { AuthContext } from "./shared/context/auth-context";

function App() {
  let token = useSelector((state) => state.token);
  let userId = useSelector((state) => state.userId);

  const login = useCallback((tkn) => {
    token = tkn;
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      token = storedData.token;
    }
  }, []);

  const logout = useCallback(() => {
    userId = null;
    token = null;
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {/* <Route path="/login" exact>
          <Login />
        </Route> */}
        <Route path="/pets" exact>
          <Pets />
        </Route>
        <Route path="/description/:petId">
          <PetDescription />
        </Route>
        <Route path="/profil/:userId" exact>
          <UserProfil />
        </Route>
        <Route path="/favorites/:userId" exact>
          <Favorite />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/pets" exact>
          <Pets />
        </Route>
        <Route path="/description/:petId">
          <PetDescription />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
