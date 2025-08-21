import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";
import { config } from "../config.js";

dotenv.config({ path: "../.env" });

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  {
    host: config.db_host,
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

export default Favourite;