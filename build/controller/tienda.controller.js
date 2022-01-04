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
exports.tiendaController = void 0;
const database_1 = __importDefault(require("../database"));
class TiendaController {
    obtenerTiendas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("Select * from TIENDAS", (err, result, fields) => {
                res.json(result);
            });
        });
    }
    agregarTienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Insert into TIENDAS (Nombre_Tienda, Sap, Region, Territorio, Idpdv) VALUES (?,?,?,?,?)";
            yield database_1.default.query(sql, [data.NOMBRE, data.SAP, data.REGION, data.TERRITORIO, data.IDPDV], (err, result) => {
                try {
                    if (err)
                        throw err;
                    res.json(result);
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
    eliminarTienda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "Delete from TIENDAS";
            const sql2 = "ALTER TABLE TIENDAS AUTO_INCREMENT = 1";
            yield database_1.default.query(sql, (err, result) => {
                res.json(result);
            }); //Eliminamos Usuarios
            yield database_1.default.query(sql2, (err, result) => {
                console.log(result);
            }); //Inicializamos incrementos en 1
        });
    }
}
exports.tiendaController = new TiendaController();
