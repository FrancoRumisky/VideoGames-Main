var express = require("express");
var router = express.Router();
const { Genero } = require("../../db");
const { API_KEY } = process.env;
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const genres = await axios(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    ).then((res) => res.data.results.map((e) => e.name));

    genres.forEach((e) =>
      Genero.findOrCreate({
        where: { name: e },
      })
    );

    const generos = await Genero.findAll();

    res.send(generos);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
