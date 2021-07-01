import React from "react";
import styles from './Landing.module.css'
import { Link } from 'react-router-dom';


const Landing = () => {


  return (
    <div className={styles.landing}>
      <Link to='/home'><button className={styles.button}>Ir al Home!</button></Link>
    </div>
  );
};

export default Landing;
