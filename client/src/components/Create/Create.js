import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Create.module.css";
import axios from "axios";

const platforms = [
  { name: "PS3", id: 1 },
  { name: "PS4", id: 2 },
  { name: "PS5", id: 3 },
  { name: "PC", id: 4 },
  { name: "Xbox", id: 5 },
  { name: "Xbox One", id: 6 },
];

const uncheckElements = () => {
  const uncheck = document.getElementsByTagName("input");
  for (let i = 0; i < uncheck.length; i++) {
    if (uncheck[i].type === "checkbox") {
      uncheck[i].checked = false;
    }
  }
};

const Create = () => {
  let genres = useSelector((state) => state.genres);
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredDescriptionTouched, setEnteredDescriptionTouched] =
    useState(false);
  const [enteredReleased, setEnteredReleased] = useState("");
  const [enteredReleasedTouched, setEnteredReleasedTouched] = useState(false);
  const [enteredRating, setEnteredRating] = useState("");
  const [enteredRatingTouched, setEnteredRatingTouched] = useState(false);

  
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  };
  
  const descriptionInputChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const descriptionInputBlurHandler = (event) => {
    setEnteredDescriptionTouched(true);
  };
  
  const releasedInputChangeHandler = (event) => {
    setEnteredReleased(event.target.value);
  };
  const releasedInputBlurHandler = (event) => {
    setEnteredReleasedTouched(true);
  };
  
  const ratingInputChangeHandler = (event) => {
    setEnteredRating(event.target.value);
  };
  const ratingInputBlurHandler = (event) => {
    setEnteredRatingTouched(true);
  };
  
  const enteredNameIsValid = enteredName.trim() !== "";
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredDescriptionIsValid = enteredDescription.trim().length > 8;
  const descriptionInputIsInvalid =
    !enteredDescriptionIsValid && enteredDescriptionTouched;

  const enteredReleasedIsValid = enteredReleased.trim() !== "";
  const releasedInputIsInvalid =
    !enteredReleasedIsValid && enteredReleasedTouched;

  const enteredRatingIsValid = enteredRating >=0 && enteredRating <=5;
  const ratingInputIsInvalid = !enteredRatingIsValid && enteredRatingTouched;

  let formIsValid = false;

  if (
    enteredNameIsValid &&
    enteredDescriptionIsValid &&
    enteredReleasedIsValid &&
    enteredRatingIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    
    const enteredGenres = [];
    const enteredPlatforms = [];

    let platformsCheckboxes = document.querySelectorAll(
      "input[id=platforms][type=checkbox]:checked"
    );

    for (let i = 0; i < platformsCheckboxes.length; i++) {
      enteredPlatforms.push(platformsCheckboxes[i].value);
    }

    let genresCheckboxes = document.querySelectorAll(
      "input[id=genres][type=checkbox]:checked"
    );

    for (let i = 0; i < genresCheckboxes.length; i++) {
      enteredGenres.push(genresCheckboxes[i].value);
    }

    axios
      .post("http://localhost:3001/videogame", {
        name: enteredName,
        description: enteredDescription,
        released: enteredReleased,
        rating: enteredRating,
        platforms: enteredPlatforms,
        genres: enteredGenres,
      })
      .then(
        (response) => {
          if (response) {
            alert("Juego enviado!");
          }
        },
        (error) => {
          alert(error);
        }
      );

    uncheckElements();
    setEnteredName("");
    setEnteredNameTouched(false);
    setEnteredDescription("");
    setEnteredDescriptionTouched(false);
    setEnteredReleased("");
    setEnteredReleasedTouched(false);
    setEnteredRating("");
    setEnteredRatingTouched(false);
  };

  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.button}>Volver al Home!</button>
      </Link>
      <form className={styles.form} onSubmit={confirmHandler}>
        <div className={styles.control}>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
          />
          {nameInputIsInvalid && (
            <p className={styles.error}>Debe ingresar un nombre.</p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="description">Descripción:</label>
          <textarea
            type="text"
            id="description"
            value={enteredDescription}
            onChange={descriptionInputChangeHandler}
            onBlur={descriptionInputBlurHandler}
          />
          {descriptionInputIsInvalid && (
            <p className={styles.error}>Debe ingresar una descripción mayor a 8 caracteres.</p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="released">Fecha de Lanzamiento:</label>
          <input
            type="text"
            id="released"
            value={enteredReleased}
            onChange={releasedInputChangeHandler}
            onBlur={releasedInputBlurHandler}
          />
          {releasedInputIsInvalid && (
            <p className={styles.error}>
              Debe ingresar una fecha de lanzamiento.
            </p>
          )}
        </div>
        <div className={styles.control}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            value={enteredRating}
            onChange={ratingInputChangeHandler}
            onBlur={ratingInputBlurHandler}
          />
          {ratingInputIsInvalid && (
            <p className={styles.error}>Debe ingresar un rating válido(entre 0 y 5).</p>
          )}
        </div>
        <div className={styles.checkbox}>
          <label htmlFor="genres">Géneros:</label>

          {genres.map((g) => {
            return (
              <label key={g.id}>
                {g.name}
                <input type="checkbox" id="genres" value={g.name} />
              </label>
            );
          })}
        </div>
        <div className={styles.checkbox}>
          <label htmlFor="platforms" >Plataformas:</label>
          {platforms.map((p) => {
            return (
              <label key={p.id}>
                {p.name}
                <input type="checkbox" id="platforms" value={p.name} />
              </label>
            );
          })}
        </div>
        <button className={styles.button} type="submit" disabled={!formIsValid}>
          Crear Videojuego!
        </button>
      </form>
    </div>
  );
};

export default Create;
