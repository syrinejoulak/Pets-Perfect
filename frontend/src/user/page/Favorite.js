import React from "react";

import FavoriteHeader from "../components/FavoriteHeader";
import FavoritesList from "../components/FavoritesList";
import NoFavoriteFound from "../components/NoFavoriteFound";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Favorite.css";

const Favorite = () => {
  const userId = useParams().userId;
  const USERS = useSelector((state) => state.users);
  const userFavoritePage = USERS.filter((user) => user.userId === userId)[0];
  const userFavoritePets = userFavoritePage.favoritePets;
  console.log("userpets", userFavoritePets);

  if (userFavoritePets.length === 0) {
    return (
      <div id="second">
        <FavoriteHeader />
        <NoFavoriteFound />
      </div>
    );
  }
  return (
    <div id="second">
      <FavoriteHeader />
      <FavoritesList items={userFavoritePets} />
    </div>
  );
};

export default Favorite;
