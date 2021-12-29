"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexController {
    obtenerTiendas(req, res) {
        res.send("Hola mundo desde el controller");
    }
}
exports.indexController = new IndexController();
