"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controller/index.controller");
const usuario_controller_1 = require("../controller/usuario.controller");
const tienda_controller_1 = require("../controller/tienda.controller");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Usuarios
        this.router.post("/login", usuario_controller_1.usuarioController.validarUsuario);
        this.router.get("/obtener/usuarios", usuario_controller_1.usuarioController.obtenerUsuarios);
        this.router.delete("/eliminar/usuarios", usuario_controller_1.usuarioController.eliminarUsuarios);
        this.router.post("/agregar/usuario", usuario_controller_1.usuarioController.agregarUsuario);
        //Tiendas
        this.router.get("/obtener/tiendas", tienda_controller_1.tiendaController.obtenerTiendas);
        this.router.post("/agregar/tienda", tienda_controller_1.tiendaController.agregarTienda);
        this.router.delete("/eliminar/tiendas", tienda_controller_1.tiendaController.eliminarTienda);
        //Obtener <------------------------------------------------------------------------------------
        this.router.post("/obtener/inventario", index_controller_1.indexController.obtenerInventario);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
