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
exports.promocionController = void 0;
const database_1 = __importDefault(require("../database"));
class PromocionController {
    obtenerPromocionesPrepago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const sql = "Select * FROM PROMOCIONES_PREPAGO where Fecha_Inicio <= ? && Fecha_Final >= ?;";
            yield database_1.default.query(sql, [data.FECHA, data.FECHA], (err, result, fields) => {
                if (err)
                    res.json(err);
                res.json(result);
            });
        });
    }
    obtenerPromocionesPospago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const sql = "Select * FROM PROMOCIONES_POSPAGO where Fecha_Inicio <= ? && Fecha_Final >= ?;";
            yield database_1.default.query(sql, [data.FECHA, data.FECHA], (err, result, fields) => {
                if (err)
                    res.json(err);
                res.json(result);
            });
        });
    }
    obtenerPromocionesRenovacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const sql = "Select * FROM PROMOCIONES_RENOVACION where Fecha_Inicio <= ? && Fecha_Final >= ?;";
            yield database_1.default.query(sql, [data.FECHA, data.FECHA], (err, result, fields) => {
                if (err)
                    res.json(err);
                res.json(result);
            });
        });
    }
    agregarPromocionesPrepago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Insert into PROMOCIONES_PREPAGO values (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,?,?,?)";
            yield database_1.default.query(sql, [data.PVP, data.DESCUENTO, data.ID_TERMINAL, data.FECHA_INICIO, data.FECHA_FINAL], (err, result) => {
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
    agregarPromocionesPospago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Insert into PROMOCIONES_POSPAGO values (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,?,?,?)";
            yield database_1.default.query(sql, [data.PVP, data.DESCUENTO, data.ID_TERMINAL, data.FECHA_INICIO, data.FECHA_FINAL], (err, result) => {
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
    agregarPromocionesRenovacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Insert into PROMOCIONES_RENOVACION values (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,?,?,?)";
            yield database_1.default.query(sql, [data.PVP, data.DESCUENTO, data.ID_TERMINAL, data.FECHA_INICIO, data.FECHA_FINAL], (err, result) => {
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
}
exports.promocionController = new PromocionController();
