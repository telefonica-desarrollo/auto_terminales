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
        this.router.post("/login", index_controller_1.indexController.validarUsuario);
        //Obtener <------------------------------------------------------------------------------------
        this.router.get("/obtener/tiendas", index_controller_1.indexController.obtenerTiendas);
        this.router.post("/obtener/inventario", index_controller_1.indexController.obtenerInventario);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
