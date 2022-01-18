"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controller_1 = require("../controller/usuario.controller");
const tienda_controller_1 = require("../controller/tienda.controller");
const terminales_controller_1 = require("../controller/terminales.controller");
const promociones_controller_1 = require("../controller/promociones.controller");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Usuarios
        this.router.post("/login", usuario_controller_1.usuarioController.validarUsuario);
        this.router.get("/obtener/usuarios", usuario_controller_1.usuarioController.obtenerUsuarios);
        this.router.post("/obtener/usuario", usuario_controller_1.usuarioController.obtenerUsuario);
        this.router.delete("/eliminar/usuarios", usuario_controller_1.usuarioController.eliminarUsuarios);
        this.router.post("/agregar/usuario", usuario_controller_1.usuarioController.agregarUsuario);
        //Tiendas
        this.router.get("/obtener/tiendas", tienda_controller_1.tiendaController.obtenerTiendas);
        this.router.post("/agregar/tienda", tienda_controller_1.tiendaController.agregarTienda);
        this.router.delete("/eliminar/tiendas", tienda_controller_1.tiendaController.eliminarTienda);
        //Terminales
        this.router.get("/obtener/terminales", terminales_controller_1.terminalController.obtenerTerminales);
        this.router.post("/agregar/terminal", terminales_controller_1.terminalController.agregarTerminal);
        //Promociones
        this.router.post("/obtener/promociones/prepago", promociones_controller_1.promocionController.obtenerPromocionesPrepago);
        this.router.post("/obtener/promociones/pospago", promociones_controller_1.promocionController.obtenerPromocionesPospago);
        this.router.post("/obtener/promociones/renovacion", promociones_controller_1.promocionController.obtenerPromocionesRenovacion);
        this.router.post("/agregar/promociones/prepago", promociones_controller_1.promocionController.agregarPromocionesPrepago);
        this.router.post("/agregar/promociones/pospago", promociones_controller_1.promocionController.agregarPromocionesPospago);
        this.router.post("/agregar/promociones/renovacion", promociones_controller_1.promocionController.agregarPromocionesRenovacion);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
