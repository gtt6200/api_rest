//import { Router } from "express";
//import {methods as detalleController} from "../controllers/detalle.controller.js"
const express = require("express");
const detalleController = require("../controllers/detalle.controller.js");

const ruta = express.Router();

ruta.get("/", detalleController.getDetalles);
ruta.get("/filtrados", detalleController.getDetallesReducidos);
ruta.get("/anticipos", detalleController.getAnticipo);
ruta.get("/:id", detalleController.getDetallebyId);
//ruta.post("/", detalleController.addDetalle);
//ruta.delete("/:id", detalleController.removeDetalle);
ruta.put("/update", detalleController.updateDetalle);

//export default router;
module.exports = ruta;