import { Sequelize } from "sequelize";
import configData from "./config.json" assert { type: "json" };

const { username, password, database, host, dialect } = configData.development;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

export default sequelize;
