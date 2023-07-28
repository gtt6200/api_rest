// import { config } from "dotenv";

// config();

// export default {
//     host: process.env.HOST || "",
//     database: process.env.DATABASE || "",
//     user: process.env.USER || "",
//     password: process.env.PASSWORD || ""
// }

require("dotenv").config();


const configuration = {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || ""
};

module.exports = configuration;