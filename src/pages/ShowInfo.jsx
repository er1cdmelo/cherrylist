import { useParams } from "react-router-dom";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import React, { useEffect, useState, useContext } from "react";
import styles from "./ShowInfo.module.css";
import Loading from "../components/Loading";
import Button from "../components/Button";
import {
  WatchListData,
  FavoritesData,
} from "../components/providers/watchlist";
import audio from "../components/providers/pop.mp3";

const ShowInfo = () => {
  const { id } = useParams();
  const [show, setShow] = useState("");
  const [images, setImages] = useState("");
  const [banner, setBanner] = useState("");
  const [rating, setRating] = useState(0);
  const [cast, setCast] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [showEpisodes, setShowEpisodes] = useState(false);
  const [showImages, setShowImages] = useState(true);
  const { watched, setWatched } = React.useContext(WatchListData);
  const { favorited, setFavorited } = React.useContext(FavoritesData);
  const arrStars = [];

  let watchlist = localStorage.getItem("watchlist");
  if (watchlist !== null) {
    watchlist = JSON.parse(localStorage.getItem("watchlist"));
  }
  let favorites = localStorage.getItem("favorites");
  if (favorites !== null) {
    favorites = JSON.parse(localStorage.getItem("favorites"));
  }

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/images`)
      .then((res) => res.json())
      .then((data) => {
        setRating((show.rating.average * 5) / 10);
        setImages(data);
        document.title = `CherryList - ${show.name}`;
      })
      .catch((err) => console.log(err));
  }, [show]);

  useEffect(() => {
    if (images.length) {
      for (var i = 0; i < images.length; i++) {
        if (images[i].type === "background") {
          if (images[i].resolutions.original.url) {
            setBanner(images[i].resolutions.original.url);
            return;
          }
        }
      }
      setBanner(
        "https://media.istockphoto.com/photos/black-canvas-with-delicate-grid-to-use-as-background-or-texture-picture-id1143755923?k=20&m=1143755923&s=612x612&w=0&h=xM-CYFltFp1rq1lxVv0T7zsPlbU1IfVniXDcAXZbaKw="
      );
    }
  }, [images]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}/cast`)
      .then((res) => res.json())
      .then((data) => {
        setCast(data);
        if (watchlist !== null) {
          if (watchlist.includes(id)) {
            setWatched(true);
          }
        }
        if (favorites !== null) {
          if (favorites.includes(id)) {
            setFavorited(true);
          }
        }
      })
      .catch((err) => console.log(err));

    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setEpisodes(data);
        }
      });
  }, [id]);

  useEffect(() => {
    if (watchlist !== null) {
      if (watchlist.includes(id)) {
        setWatched(true);
      } else setWatched(false);
    }
  }, [watchlist]);

  useEffect(() => {
    if (favorites !== null) {
      if (favorites.includes(id)) {
        setFavorited(true);
      } else setFavorited(false);
    }
  }, [favorites]);

  for (let i = 1; i <= Math.floor(rating); i++) {
    arrStars.push(<BsStarFill />);
    if (i === Math.floor(rating) && rating !== Math.floor(rating))
      arrStars.push(<BsStarHalf />);
  }

  const playAudio = () => {
    new Audio(audio).play();
  };

  const watchListEvent = () => {
    playAudio();
    if (!watchlist) {
      localStorage.setItem("watchlist", JSON.stringify([]));
    }
    watchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (watchlist.includes(id)) {
      watchlist.splice(watchlist.indexOf(id));
      // SET WATCHED
      setWatched(false);
    } else {
      watchlist.push(id);
      // SET WATCHED
      setWatched(true);
    }
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  };

  const favoriteEvent = () => {
    playAudio();
    if (!favorites) {
      localStorage.setItem("favorites", JSON.stringify([]));
    }
    favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites.includes(id)) {
      favorites.splice(favorites.indexOf(id));
      // SET FAVORITE
      setFavorited(false);
    } else {
      favorites.push(id);
      // SET FAVORITE
      setFavorited(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className={styles.global_container}>
      {show ? (
        <div className={styles.card_container}>
          <div className={styles.first_info}>
            <div className={styles.poster}>
              <img src={show.image.medium} alt="poster" />
            </div>
            <div className={styles.text_area}>
              <div className={styles.title_date}>
                <h1>{show.name}</h1>
                <span>{show.premiered.substr(0, 4)}{show.ended && -show.ended.substr(0, 4)}</span>
              </div>
              <div className={styles.stream_status}>
                <span
                  className={
                    show.status === "Running" ? styles.g_color : styles.r_color
                  }
                >
                  {show.status}
                </span>
                <span className={styles.rating}>{arrStars}</span>
                {show.webChannel && (
                  <div className={styles.web_channel}>
                    On{" "}
                    <span
                      className={
                        styles[
                          `${show.webChannel.name.split(" ")[0].substr(0, 3)}`
                        ]
                      }
                    >
                      {" "}
                      {show.webChannel.name}
                    </span>
                  </div>
                )}
              </div>
              <p>
                {show.summary
                  .replace("<p>", "")
                  .replace("<i>", "")
                  .replace("</i>", "")
                  .replace("</p>", "")
                  .replace("</b>", "")
                  .replace("<b>", "")}
              </p>
            </div>{" "}
            {/* TEXT AREA*/}
          </div>
          <div className={styles.second_info}>
            <div className={styles.buttons}>
              <Button clickEvent={watchListEvent} text="Watchlist" />
              <Button clickEvent={favoriteEvent} text="Favorite" />
            </div>
            <div className={styles.genres}>
              <h2>Genres</h2>
              <ul>
                {show.genres.map((genre, index) =>
                  index > 0 ? (
                    <li className={styles.border_left}>{genre}</li>
                  ) : (
                    <li>{genre}</li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className={styles.cast}>
            <h2>Cast</h2>
            <ul>
              {cast ? (
                cast.map((pers, index) =>
                  index < 6 ? (
                    <li>
                      <img src={pers.person.image.medium} alt="actor" />
                      <span>{pers.person.name}</span>
                    </li>
                  ) : (
                    ""
                  )
                )
              ) : (
                <Loading />
              )}
            </ul>
          </div>
          <div className={styles.episodes}>
            <h2>Episodes {episodes.length && <span>{episodes.length}</span>} {showEpisodes ? <AiFillCaretUp onClick={() => setShowEpisodes(false)} /> : <AiFillCaretDown onClick={() => setShowEpisodes(true)} />}</h2>
            <ul>
              {episodes.length && showEpisodes
                ? episodes.map((ep) => (
                    <li>
                      <img
                        src={
                          ep.image
                            ? ep.image.medium
                            : "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg"
                        }
                        alt="cover"
                      />
                      <div className={styles.text}>
                        <span>
                          S{ep.season}EP{ep.number}
                        </span>
                        <h2>{ep.name === 'TBA' ? 'Unknown' : ep.name}</h2>
                        <p>
                          {ep.summary ? ep.summary
                            .replaceAll("<p>", "")
                            .replaceAll("<i>", "")
                            .replaceAll("</i>", "")
                            .replaceAll("</p>", "")
                            .replaceAll("</b>", "")
                            .replaceAll("<b>", "")
                            .replaceAll("&amp;", "&") : 'No summary avaible'
                            }
                        </p>
                      </div>
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className={styles.images}>
            <h2>Images <span>{images.length && images.length}</span> {showImages ? <AiFillCaretUp onClick={() => {
              setShowImages(false)
            }} /> : <AiFillCaretDown onClick={() => setShowImages(true)} />}</h2>
            <ul>
              {images && showImages ? (
                images.map(img => (
                  <li className={img.resolutions.medium || img.resolutions.original ? '' : styles.blank}>{img.resolutions.medium ? <img src={img.resolutions.medium.url} alt="cover" /> : <img src={img.resolutions.original.url} alt="cover" />}</li>
                ))
              ) : ''}
            </ul>
          </div>{ show.network &&
          <div className={styles.network}>
            {show.network.name && <span>Produced by <h2>{show.network.name}</h2></span>}
          </div>}
          {images && (
            <div className={styles.banner}>
              <img src={banner} alt="background" />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ShowInfo;
