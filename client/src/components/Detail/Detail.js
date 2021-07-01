import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getVideogameDetail } from "../../actions/videogame-action";
import styles from "./Detail.module.css";

const Detail = (props) => {
  const params = useParams();
  let videogameDetail = useSelector((state) => state.videogameDetail);
  const videogames = useSelector(state => state.videogames);
  const videogame = videogames.find(x => x.id.toString() === params.id.toString());
  const genres = videogame.genres;
  const videogameID = params.id;

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getVideogameDetail(videogameID));
  }, [dispatch, videogameID]);


  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.button}>Volver al Home!</button>
      </Link>
      {Object.keys(videogameDetail).length > 0 && genres && (<div className={styles.detail}>
        <h1>Nombre: {videogameDetail.name}</h1>
        <img src={videogameDetail.img} alt="Videogame" className={styles.img} />
        <p>Géneros: {genres.map(genre => <p>{genre}</p>)}</p>
        <p>Descripción: {(videogameDetail.description).replaceAll(/<\/?[^>]+(>|$)/g, '')}</p>
        <p>Fecha de Lanzamiento: {videogameDetail.released}</p>
        <p>Rating: {videogameDetail.rating}</p>
        <p>Plataformas: {(videogameDetail.platforms).join(', ')}</p>
      </div>)}
    </div>
  );
};

export default Detail;
