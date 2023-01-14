var express = require("express");
var router = express.Router();
const { Videogame, Genero } = require("../../db");
const { API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

const mapDataAPI = (dataAPI) => {
  return {
    next: dataAPI.next,
    games: dataAPI.results.map((e) => {
      return {
        name: e.name,
        id: e.id,
        image: e.background_image,
        rating: e.rating,
        generos: e.genres?.map((g) => g),
        plataformas: e.platforms?.map(p=> p.platform.name) 
      };
    }),
  };
};

const dataAPI = async (name = "", page = 1) => {
  const games = [];

  for (i = 0; i < 5; i++) {
    await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${name}&page=${page}`
    ).then((res) => games.push(mapDataAPI(res.data)));
    if (games.next !== null) page++;
  }
  return games;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    console.log(name)
    try {
      const dataDB = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: [
          {
            model: Genero,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });

      const dataAPIName = await dataAPI(name);
      
      const games = dataAPIName.map(e=>e.games)

      const fullData = dataDB.concat(games).flat();
      res.send(fullData);
    } catch (e) {
      console.log(e)
      res.status(404).json("Juego No Encontrado");
    }
  } else {
    try {
      const dataDB = await Videogame.findAll({ include: { model: Genero } });

      const data = await dataAPI()
      const games =  data.map(e=> e.games)

      const fullData = games.concat(dataDB).flat();

      res.json(fullData);
    } catch (e) {
      console.log(e)
      res.status(500).send(e);
    }
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    try {
      let dataDB = await Videogame.findByPk(id, { include: { model: Genero } });
      res.json(dataDB);
    } catch (e) {
      res.status(404).send("No hay resultados");
    }
  } else {
    try {
      let dataAPI = await axios(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      ).then((res) => {
        return {
          id: res.data.id,
          name: res.data.name,
          image: res.data.background_image,
          imageAdditional: res.data.background_image_additional,
          descripcion: res.data.description_raw,
          fecha_de_lanzamiento: res.data.released,
          rating: res.data.rating,
          generos: res.data.genres.map((g) => g),
          plataformas: res.data.platforms.map((g) => g),
        };
      });

      res.json(dataAPI);
    } catch (e) {
      res.status(404).send("No hay resultados");
    }
  }
});

router.post("/", async (req, res) => {
  const {
    name,
    descripcion,
    plataformas,
    fecha_de_lanzamiento,
    rating,
    generos,
    image,
    imageAdditional
  } = req.body;

  if (name && descripcion && plataformas) {
    try {
      const gameFound = await Videogame.findAll({
        where: { name: name },
      });

      if (gameFound.length > 0) {
        return res.status(404).json("Ya Existe Este Juego!");
      }

      const newGame = await Videogame.create({
        name,
        descripcion,
        plataformas,
        fecha_de_lanzamiento,
        rating,
        image,
        imageAdditional
      });

      const generosNewGame = await Genero.findAll({
        where: { name: generos },
      });


      newGame.addGenero(generosNewGame);

      res.json("Su juego se ha creado exitosamente!");
    } catch (e) {
      console.log(e);
      res.status(404).json("error en alguno de los datos provistos");
    }
  } else {
    res.status(404).json("Faltan datos");
  }
});

module.exports = router;
