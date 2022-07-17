import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  WatchListData,
  FavoritesData,
} from "../components/providers/watchlist";
import styles from "./Button.module.css";

const Button = ({ clickEvent, text }) => {
  const [active_w, setActive_w] = useState(false);
  const [active_f, setActive_f] = useState(false);
  const { watched } = React.useContext(WatchListData);
  const { favorited } = React.useContext(FavoritesData);

  useEffect(() => {
    if (watched && text === "Watchlist") {
      setActive_w(true);
    }
    if (!watched && text === "Watchlist") {
      setActive_w(false);
    }
  }, [watched]);

  useEffect(() => {
    if (favorited && text === "Favorite") {
      setActive_f(true);
    }
    if (!favorited && text === "Favorite") {
      setActive_f(false);
    }
  }, [favorited]);

  return text === "Watchlist" ? (
    <button
      onClick={clickEvent}
      className={active_w ? styles.true : styles.false}
    >
      {text} {active_w ? <BsCheck /> : null}
    </button>
  ) : (
    <span onClick={clickEvent} className={active_f ? styles.fav_true : styles.fav_false}>
      {active_f ? <AiFillHeart /> : <AiOutlineHeart />}
    </span>
  );
};

export default Button;
