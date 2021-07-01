import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cleanError, getVideogamesByName } from "../../actions/videogames-actions";
import styles from "./Menu.module.css";

const Menu = () => {
  const dispatch = useDispatch();
  let error = useSelector((state) => state.error);
  const nameInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    dispatch(getVideogamesByName(enteredName));
    if (error) return alert(error);
  };

  const cleanErrorHandler = () => {
    dispatch(cleanError());
  }

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler}>
        <input className={styles.input} ref={nameInputRef} onClick={cleanErrorHandler}/>
        <button className={styles.button} type="submit">
          Buscar
        </button>
      </form>
      <div>
        <Link to="/create">
          <button className={styles.button}>Crear un juego</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
