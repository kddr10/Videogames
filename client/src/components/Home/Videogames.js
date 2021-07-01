import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../../actions/videogames-actions";
import styles from "./Videogames.module.css";

const Videogames = () => {
  let videogames = useSelector((state) => state.videogames);
  let filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  
  
  const nextPage = () => {
    setPage(page + 1);
  };
  
  const prevPage = () => {
    setPage(page - 1);
  };
  
  const getVideogamesToShow = () => {
    if (filters.origin || filters.genre) {
      const conditions = [];
      
      if (filters.origin) {
        const condition =
        filters.origin === "Juegos Creados"
        ? (vg) => vg.id.length === 36//los de la db tienen UUID(length de 36)
        : (vg) => vg.id.length !== 36;
        conditions.push(condition);
      }
      
      if (filters.genre) {
        const condition = (vg) => vg.genres.find((g) => g === filters.genre);
        conditions.push(condition);
      }
      
      const videogamesFiltered = videogames.filter((videogame) => {
        return conditions.every((conditionFunction) => {
          return conditionFunction(videogame);
        });
      });
      
      if (page === 1) return videogamesFiltered.slice(0, 15);
      if (page === 2) return videogamesFiltered.slice(15, 30);
      if (page === 3) return videogamesFiltered.slice(30, 45);
      if (page === 4) return videogamesFiltered.slice(45, 60);
      if (page === 5) return videogamesFiltered.slice(60, 75);
      if (page === 6) return videogamesFiltered.slice(75, 90);
      if (page === 7) return videogamesFiltered.slice(90);
      
    }
    // for(let i = 0; i < videogames.length / 15; i++) {
      //   if (page === i+1) return videogames.slice(i*15, (i*15)+15)
      // }
      
      if (page === 1) return videogames.slice(0, 15);
      if (page === 2) return videogames.slice(15, 30);
      if (page === 3) return videogames.slice(30, 45);
      if (page === 4) return videogames.slice(45, 60);
      if (page === 5) return videogames.slice(60, 75);
      if (page === 6) return videogames.slice(75, 90);
      if (page === 7) return videogames.slice(90);
    };
    
    useEffect(() => {
      dispatch(getVideogames());
    }, [dispatch]);
    
    return (
      <div className={styles.wrapper}>
      <div className={styles.container}>
        {getVideogamesToShow().length > 0 ? (
          getVideogamesToShow().map((vg) => (
            <Link to={`/detail/${vg.id}`} style={{ textDecoration: "none" }}>
              <div className={styles.card} key={vg.id}>
                <h3>{vg.name}</h3>
                <img src={vg.img} alt="Videogame" className={styles.img} />
                <p>{vg.genres.join(", ")}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className={styles.loader}>Loading...</p>
        )}
      </div>
      <div className={styles.pagination}>
        {page > 1 && (
          <button className={styles.button} onClick={prevPage}>
            Anterior
          </button>
        )}
        <p>Página {page}</p>
        {page < videogames.length / 15 && getVideogamesToShow().length === 15 && (
          <button className={styles.button} onClick={nextPage}>
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default Videogames;
