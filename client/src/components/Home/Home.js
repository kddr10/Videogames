import React, { useEffect } from "react";
import Videogames from "./Videogames";
import Filter from "./Filter";
import Menu from "./Menu";
import styles from './Home.module.css';
import { getGenres } from "../../actions/genres-actions";
import { useDispatch } from "react-redux";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Menu />
      <Filter />
      <Videogames />
    </div>
  );
};

export default Home;
