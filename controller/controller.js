require("dotenv").config();
const axios = require("axios");
const Favourite = require("../models/favourites");
var OMDB_API = `https://www.omdbapi.com/t?apikey=${process.env.API_KEY}&`;

function getMovie(req, res) {
  let movieTitle = req.query.title;
  axios
    .get(OMDB_API + `q=${movieTitle}&type=movie`)
    .then((response) => {
      console.log(response.data);
      res.status(200).json({ movies: response.data });
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
      res.status(500).json({ error: "Failed to fetch movie data" });
    });
}

function getShow(req, res) {
  let showTitle = req.query.title;
  axios
    .get(OMDB_API + `q=${showTitle}&type=series`)
    .then((response) => {
      console.log(response.data);
      res.status(200).json({ shows: response.data });
    })
    .catch((error) => {
      console.error("Error fetching show data:", error);
      res.status(500).json({ error: "Failed to fetch show data" });
    });
}

async function getFavourites(req, res) {
  try {
    const favourites = await Favourite.findAll();
    res.json(favourites);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function addFavourites(req, res) {
  const { title, rating, release_date, director, description, type } = req.body;
  try {
    const newFavourite = await Favourite.create({
      title,
      rating,
      release_date,
      director,
      description,
      type,
    });
    console.log("New Favourite created:", newFavourite);
    res.status(201).json(newFavourite);
  } catch (error) {
    console.error("Error creating favourite movie/show:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateFavourites(req, res) {
  const { id } = req.params;
  const { title, rating, release_date, director, description, type } = req.body;

  try {
    const updateFavourite = await Favourite.update(
      { title, rating, release_date, director, description, type },
      { where: { id } }
    );
    console.log("Updated:", updateFavourite);
    res.status(201).json(updateFavourite);
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteFavourites(req, res) {
  const { id } = req.params;
  try {
    const deleteFavourite = await Favourite.destroy({ where: { id } });
    console.log("Deleted:", deleteFavourite);
    res.status(201).json(deleteFavourite);
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
