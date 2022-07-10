import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./MovieCard.module.css";
import Loading from "../components/Loading";

const MovieCard = ({ search }) => {
  const splitedSearch = search.split(" ");
  let formatedSearch = splitedSearch[0];
  for (var i = 0; i < splitedSearch.length; i++) {
    if (i !== 0) {
      formatedSearch += `+${splitedSearch[i]}`;
    }
  }

  const [show, setShow] = useState("");
  const [showId, setShowId] = useState("");

  useEffect(() => {
    if (isNaN(search * 1)) {
      fetch(`https://api.tvmaze.com/singlesearch/shows?q=${formatedSearch}`)
        .then((res) => res.json())
        .then((data) => {
          setShow(data);
          setShowId(data.id);
        });
    } else {
      fetch(`https://api.tvmaze.com/shows/${search}`)
        .then((res) => res.json())
        .then((data) => {
          setShow(data);
          setShowId(data.id);
        });
    }
  }, [search]);

  return (
    <div className={styles.global}>
    <Link to={`/shows/${showId}`}>
      <div className={styles.mycard_container}>
        {show ? <img src={show.image.medium} alt="poster"></img> : <Loading />}
      </div>
      {show && <span className={styles.span}>{show.name}</span>}
    </Link>
    </div>
  );
};

export default MovieCard;
