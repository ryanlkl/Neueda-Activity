import dotenv from "dotenv";
import axios from "axios";
import Favourite from "../models/favourites.js";
import { config } from "../config.js";
dotenv.config({ path: "./.env" });


// Set up the OMDB API URL with the API key from environment variables
const OMDB_API_KEY = config.api_key
const OMDB_URL = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&`;
console.log("URL:", OMDB_URL);

// Controller functions
function getMovie(req, res) {
  let movieTitle = req.params.title;
  let API_KEY = process.env.API_KEY;
  console.log("Movie Url:", OMDB_API + `t=${movieTitle}&type=movie`);
  axios
    .get(OMDB_API + `t=${movieTitle}&type=movie`)
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
      { where: { id: id } }
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
    const deleteFavourite = await Favourite.destroy({ where: {id: id } });
    console.log("Deleted:", deleteFavourite);
    res.status(201).json(deleteFavourite);
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export {
  getMovie,
  getShow,
  getFavourites, 
  addFavourites,
  updateFavourites,
  deleteFavourites,
};