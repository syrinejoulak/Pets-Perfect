import React, { useContext } from "react";

import { AuthContext } from "../context/auth-context";
import { MdPets } from "react-icons/md";
import { GoSignIn } from "react-icons/go";
import { HiOutlineLogin } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { RiHomeHeartFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import MainHeader from "./MainHeader";
import "./MainNavigation.css";
import LogoutModal from "../Modals/LogoutModal";

const MainNavigation = () => {
  const auth = useContext(AuthContext);

  return (
    <MainHeader>
      <nav>
        <NavLink to="/" exact activeClassName="active">
          <i>
            <RiHomeHeartFill className="navbar-icon" />
            <h6>Home</h6>
          </i>
        </NavLink>

        <NavLink to="/pets" exact activeClassName="active">
          <i>
            <MdPets className="navbar-icon" />
            <h6>Pets</h6>
          </i>
        </NavLink>

        {!auth.isLoggedIn && (
          <NavLink to="/signup" exact>
            <i>
              <GoSignIn className="navbar-icon" />
              <h6>Sign up</h6>
            </i>
          </NavLink>
        )}

        {!auth.isLoggedIn && (
          <NavLink to="/login" exact>
            <i>
              <HiOutlineLogin className="navbar-icon" />
              <h6>Login</h6>
            </i>
          </NavLink>
        )}

        {/* {auth.isLoggedIn && (
          <NavLink to="/favorites/60ae64a7bc772a2e78382913" exact>
            <i>
              <AiFillHeart className="navbar-icon" />
              <h6>Favorites</h6>
            </i>
          </NavLink>
        )} */}

        {auth.isLoggedIn && (
          <NavLink to={`/profil/${auth.userId}`} exact>
            <i>
              <CgProfile className="navbar-icon" />
              <h6>Profil</h6>
            </i>
          </NavLink>
        )}

        {auth.isLoggedIn && (
          <NavLink to="/">
            <LogoutModal />
          </NavLink>
        )}
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
