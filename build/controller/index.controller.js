"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../database"));
class IndexController {
    constructor() {
        this.tiendas = [];
        database_1.default;
    }
    obtenerInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Select * from INVENTARIOS where Id_Tienda = ?";
            yield database_1.default.query(sql, [data.id_tienda], (err, result) => {
                try {
                    if (err)
                        throw "Peticion no valida";
                    res.json(result);
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
    obtenerPromocionPrepago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Select * from PROMOCIONES_PREPAGO where Id_Tienda = ?";
            yield database_1.default.query(sql, [data.id_tienda], (err, result) => {
                try {
                    if (err)
                        throw "Peticion no valida";
                    res.json(result);
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
}
exports.indexController = new IndexController();
