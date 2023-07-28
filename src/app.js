// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//routes importadas
//import detalleRoutes from "./routes/detalle.routes.js";
const detalleRoutes = require("./routes/detalle.routes");

const app=express();

//settings
app.set("port", 4201);

//middelwares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
    origin:["http://192.168.1.29","http://localhost:4200"],
    methods:["GET", "PUT"]
}))

//routes
app.use("/api/detalle", detalleRoutes);

//export default app;
module.exports = app;