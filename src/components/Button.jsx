import React, { useEffect, useState } from "react";
import { BsCheck } from "react-icons/bs";
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
    console.log("senti clicado watchlist");
    if (watched && text === "Watchlist") {
      setActive_w(true);
    }
    if (!watched && text === "Watchlist") {
      setActive_w(false);
    }
  }, [watched]);

  useEffect(() => {
    console.log("senti clicado favorites");
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
    <button
      onClick={clickEvent}
      className={active_f ? styles.true : styles.false}
    >
      {text} {active_f ? <BsCheck /> : null}
    </button>
  );
};

export default Button;
