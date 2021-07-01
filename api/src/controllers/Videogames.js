const { Videogame, Genre } = require("../db.js");
const axios = require("axios");
const { VIDEOGAMES_URL } = require("../constants");
const { API_KEY } = process.env;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

function getVideogamesByName(req, res, next) {
  let { name } = req.query;

  if (name) {
    const videogameMine = Videogame.findAll({
      where: {
        name: {
          [Op.like]: "%" + name + "%",
        },
      },
      attributes: ["name", "id", "rating"],
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    const apiRequestURL = `${VIDEOGAMES_URL}?search=${name}&key=${API_KEY}`;

    let videogamesFoundInAPI = [];

    const getRequests = (url) => {
      return axios.get(url).then((response) => {
        
        if (response.data && response.data.results) {
          videogamesFoundInAPI = [
            ...videogamesFoundInAPI,
            ...response.data.results,
          ];
        }

        if (response.data.next && videogamesFoundInAPI.length < 100) {
          return getRequests(response.data.next);
        }
      });
    };

    getRequests(apiRequestURL).then(() => {
      videogameMine.then((videogameMineResults) => {
        if (
          videogameMineResults.length === 0 &&
          videogamesFoundInAPI.length === 0
        ) {
          return res.status(400).send("No existe ningún videojuego con ese nombre");
        }
        const formattedAPIVideogames = videogamesFoundInAPI.map((videogame) => {
          const { id, name, rating, genres, background_image } = videogame;
          return {
            id,
            name,
            rating,
            img: background_image,
            genres: genres.map((vgGenre) => vgGenre.name),
          };
        });

        const formattedMineVideogames = videogameMineResults.map((vg) => {
          return {
            id: vg.id,
            name: vg.name,
            rating: vg.rating,
            genres: vg.genres.map((vgGenre) => {
              return vgGenre.name;
            }),
          };
        });
    
        const allVideogames = [...formattedMineVideogames, ...formattedAPIVideogames];
        res.send(allVideogames);
      });
    }).catch((error) => next(error));
    return
  }
  next();
}

function getAllVideogames(req, res, next) {
  const videogameMine = Videogame.findAll({
    limit: 15,
    attributes: ["name", "id", "rating"],
    include: {
      model: Genre,
      attributes: ["name"],
      through: { attributes: [] },
    },
  });

  const apiRequestURL = `${VIDEOGAMES_URL}?key=${API_KEY}`;

  let videogamesFoundInAPI = [];

  const getRequests = (url) => {
    return axios.get(url).then((response) => {
      
      if (response.data && response.data.results) {
        videogamesFoundInAPI = [
          ...videogamesFoundInAPI,
          ...response.data.results,
        ];
      }

      if (response.data.next && videogamesFoundInAPI.length < 100) {
        return getRequests(response.data.next);
      }
    });
  };

  getRequests(apiRequestURL).then(() => {
    videogameMine.then((videogameMineResults) => {
      
      const formattedAPIVideogames = videogamesFoundInAPI.map((videogame) => {
        const { id, name, rating, genres, background_image } = videogame;
        return {
          id,
          name,
          rating,
          img: background_image,
          genres: genres.map((vgGenre) => vgGenre.name),
        };
      });

      const formattedMineVideogames = videogameMineResults.map((vg) => {
        return {
          id: vg.id,
          name: vg.name,
          rating: vg.rating,
          genres: vg.genres.map((vgGenre) => {
            return vgGenre.name;
          }),
        };
      });
  
      const allVideogames = [...formattedMineVideogames, ...formattedAPIVideogames];
      return res.send(allVideogames);
    });
  });
}

module.exports = {
  getAllVideogames,
  getVideogamesByName,
};
