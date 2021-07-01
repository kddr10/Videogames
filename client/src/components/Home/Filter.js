import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogamesOrderedZa,
  getVideogamesOrderedAz,
  getVideogamesOrderedLowerRating,
  getVideogamesOrderedHigherRating,
  setOriginFilter,
  setGenresFilter
} from "../../actions/videogames-actions";
import styles from "./Filter.module.css";

const Filter = () => {
  let genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const [originSelected, setOriginSelected] = useState("");
  const [genreSelected, setGenreSelected] = useState("");
  const [orderAlphaSelected, setOrderAlfaSelected] = useState("");
  const [orderRatingSelected, setOrderRatingSelected] = useState("");

  const getVideogamesByOriginHandler = (event) => {
    setOriginSelected(event.target.value);

    dispatch(setOriginFilter(event.target.value));

  };

  const getVideogamesByGenre = (event) => {
    setGenreSelected(event.target.value);

    dispatch(setGenresFilter(event.target.value));
    
  };

  const getVideogamesOrderedAlpha = (event) => {
    setOrderAlfaSelected(event.target.value);

    if (event.target.value === "Ascendentemente") {
      dispatch(getVideogamesOrderedAz());
    }
    if (event.target.value === "Descendentemente") {
      dispatch(getVideogamesOrderedZa());
    }
    
  };

  const getVideogamesOrderedByRating = (event) => {
    setOrderRatingSelected(event.target.value);

    if (event.target.value === "Ascendentemente") {
      dispatch(getVideogamesOrderedLowerRating());
    }
    if (event.target.value === "Descendentemente") {
      dispatch(getVideogamesOrderedHigherRating());
    }
    
  };

  return (
    <div className={styles.container}>
      <label>Filtro por origen:</label>
      <select value={originSelected} onChange={getVideogamesByOriginHandler}>
        <option> </option>
        <option value="Juegos Creados">Juegos Creados</option>
        <option value="Juegos Existentes">Juegos Existentes</option>
      </select>
      <label>Filtro por género:</label>
      <select value={genreSelected} onChange={getVideogamesByGenre}>
        <option> </option>
        {genres.map((g) => {
          return (
            <option value={g.name} key={g.id}>
              {g.name}
            </option>
          );
        })}
      </select>
      <label>Ordenar Alfabéticamente:</label>
      <select value={orderAlphaSelected} onChange={getVideogamesOrderedAlpha}>
        <option> </option>
        <option value='Ascendentemente'>Ascendentemente</option>
        <option value='Descendentemente'>Descendentemente</option>
      </select>
      <label>Ordenar por Rating:</label>
      <select value={orderRatingSelected} onChange={getVideogamesOrderedByRating}>
        <option> </option>
        <option>Ascendentemente</option>
        <option>Descendentemente</option>
      </select>
    </div>
  );
};

export default Filter;
