const { Videogame, Genre } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const { VIDEOGAMES_URL } = require("../constants");
const { API_KEY } = process.env;

function updateVideogameById(req, res, next) {
  const id = req.params.id;
  const updatedVideogame = req.body;

  Videogame.update(updatedVideogame, {where: {id}}).then(videogame => res.send(videogame)).catch(error => next(error))

}

function getVideogameById(req, res, next) {
  const id = req.params.id;

  if (id.length === 36) {
    return Videogame.findByPk(id, {
      include: {
        model: Genre,
        attributes: ["name"],
        through: { attributes: [] },
      },
    })
      .then((videogame) => {
        res.send(videogame);
      })
      .catch((error) => next(error));
  } else {
    return axios
      .get(`${VIDEOGAMES_URL}/${id}?key=${API_KEY}`)
      .then((videogame) => {
        const platforms = videogame.data.platforms.map((p) => {
          return { platform: p.platform.name };
        });

        res.send({
          img: videogame.data.background_image,
          name: videogame.data.name,
          description: videogame.data.description,
          released: videogame.data.released,
          rating: videogame.data.rating,
          platforms: platforms.map((p) => {
            return p.platform;
          }),
        });
      })
      .catch((error) => next(error));
  }
}

function addVideogame(req, res, next) {
  const { name, description, released, rating, platforms, genres } = req.body;

  if (
    name.trim().length > 0 &&
    description.trim().length > 8 &&
    released.trim().length > 0 &&
    rating >=0 && rating <=5 &&
    platforms.length > 0 &&
    genres.length > 0
  ) {
    const videogameBody = Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      id: uuidv4(),
    });

    const genresBody = Genre.findAll({
      where: { name: genres },
      attributes: ["id", "name"],
    });

    Promise.all([videogameBody, genresBody])
      .then((videogame) => {
        const [videogameBody, genresBody] = videogame;
        videogameBody.addGenres(genresBody);
        res.send(videogame);
      })
      .catch((error) => next(error));
  } else return res.status(404).send("Faltan datos");
}

module.exports = {
  getVideogameById,
  addVideogame,
};
