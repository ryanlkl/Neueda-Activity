require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const Favourite = sequelize.define(
  "Favourite",
  {
    title: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    director: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    type: {
      type: DataTypes.ENUM(["movie", "show"]),
    },
  },
  {
    tableName: "favourites",
    timestamps: false,
  }
);

module.exports = Favourite;
