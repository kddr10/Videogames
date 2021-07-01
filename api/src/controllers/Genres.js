const { Genre } = require("../db.js");
const axios = require("axios");
const { GENRES_URL } = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { API_KEY } = process.env;

function getAllGenres(req, res, next) {
  const getGenresApi = axios.get(`${GENRES_URL}?key=${API_KEY}`);

  getGenresApi
    .then((genres) => {
      const result = genres.data.results;

      return result.map((genre) => {
        return { name: genre.name, id: uuidv4() };
      });
    })
    .then((genresList) => {
      const savedGenres = Genre.findAll();
      savedGenres
        .then((genres) => {
          if (genres.length === 0) {
            Genre.bulkCreate(genresList);
            return res.send(genresList);
          }
          res.send(genres);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
}

module.exports = {
  getAllGenres,
};
