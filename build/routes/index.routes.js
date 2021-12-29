"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controller/index.controller");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Obtener <------------------------------------------------------------------------------------
        this.router.get("/", index_controller_1.indexController.obtenerTiendas);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
