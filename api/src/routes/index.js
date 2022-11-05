const express = require("express");
const videogames = require("./middlewares/videogames");
const genres = require("./middlewares/genres");

const router = express();

router.use("/videogames", videogames);
router.use("/genres", genres);

module.exports = router;
