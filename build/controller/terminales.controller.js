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
exports.terminalController = void 0;
const database_1 = __importDefault(require("../database"));
class TerminalController {
    //Catalogo de Terminales
    obtenerTerminales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Obtener Terminales");
            yield database_1.default.query("Select * from TERMINALES", (err, result, fields) => {
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
    agregarTerminal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Insert into TERMINALES (Sku, Modelo, Marca, Payjoy) VALUES (?,?,?,0)";
            yield database_1.default.query(sql, [data.SKU, data.MODELO, data.MARCA, data.PAYJOY], (err, result) => {
                try {
                    if (err)
                        throw err;
                    res.json(true);
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
    agregarInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const sql = "Insert into INVENTARIO (Cantidad, Id_Tienda, Id_Terminal) VALUES (?,?,?)";
            yield database_1.default.query(sql, [data.CANTIDAD, data.ID_TIENDA, data.ID_TERMINAL], (err, result) => {
                try {
                    if (err)
                        throw err;
                    res.json(true);
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
    obtenerInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Select * from INVENTARIO where Id_Tienda = ?";
            yield database_1.default.query(sql, [data.ID_TIENDA], (err, result) => {
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
    eliminarInventario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("DELETE from INVENTARIO", (err, result) => {
                try {
                    if (err)
                        throw err;
                }
                catch (error) {
                    console.log(error);
                }
            });
            yield database_1.default.query("ALTER TABLE INVENTARIO AUTO_INCREMENT = 1", (err, result) => {
                try {
                    if (err)
                        throw err;
                }
                catch (error) {
                    console.log(error);
                }
            });
            res.json(true);
        });
    }
    actualizarPayjoy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.terminalController = new TerminalController();
