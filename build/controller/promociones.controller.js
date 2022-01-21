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
            npm;
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
            const Fecha_Inicio = new Date(data.FECHA_INICIO).toISOString().slice(0, 10).replace('T', ' ');
            const Fecha_Final = new Date(data.FECHA_FINAL).toISOString().slice(0, 10).replace('T', ' ');
            console.log(Fecha_Inicio);
            const sql = "Insert into PROMOCIONES_PREPAGO (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,1,?,?)";
            yield database_1.default.query(sql, [data.PVP, data.DESCUENTO, Fecha_Inicio, Fecha_Final], (err, result) => {
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
    agregarPromocionesPospago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const Fecha_Inicio = new Date(data.FECHA_INICIO).toISOString().slice(0, 10).replace('T', ' ');
            const Fecha_Final = new Date(data.FECHA_FINAL).toISOString().slice(0, 10).replace('T', ' ');
            console.log(Fecha_Inicio);
            const sql = "Insert into PROMOCIONES_POSPAGO (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,1,?,?)";
            yield database_1.default.query(sql, [data.PVP, data.DESCUENTO, Fecha_Inicio, Fecha_Final], (err, result) => {
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
    agregarPromocionesRenovacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const Fecha_Inicio = new Date(data.FECHA_INICIO).toISOString().slice(0, 10).replace('T', ' ');
            const Fecha_Final = new Date(data.FECHA_FINAL).toISOString().slice(0, 10).replace('T', ' ');
            console.log(Fecha_Inicio);
            const sql = "Insert into PROMOCIONES_RENOVACION (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,1,?,?)";
            yield database_1.default.query(sql, [data.PVP, data.DESCUENTO, Fecha_Inicio, Fecha_Final], (err, result) => {
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
    eliminarPromocionesPrepago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Borramos todas las promociones
            yield database_1.default.query("DELETE from PROMOCIONES_PREPAGO", (err, result) => { });
            yield database_1.default.query("ALTER TABLE PROMOCIONES_PREPAGO AUTO_INCREMENT = 1", (err, result) => { });
            res.json(true);
        });
    }
    eliminarPromocionesPospago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Borramos todas las promociones
            yield database_1.default.query("DELETE from PROMOCIONES_POSPAGO", (err, result) => { });
            yield database_1.default.query("ALTER TABLE PROMOCIONES_POSPAGO AUTO_INCREMENT = 1", (err, result) => { });
            res.json(true);
        });
    }
    eliminarPromocionesRenovacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Borramos todas las promociones
            yield database_1.default.query("DELETE from PROMOCIONES_RENOVACION", (err, result) => { });
            yield database_1.default.query("ALTER TABLE PROMOCIONES_RENOVACION AUTO_INCREMENT = 1", (err, result) => { });
            res.json(true);
        });
    }
}
exports.promocionController = new PromocionController();
