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
    validarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Select * from USUARIOS where Usuario = ? && Password = ?";
            yield database_1.default.query(sql, [data.usuario, data.password], (err, result) => {
                try {
                    if (err)
                        throw "Peticion no valida";
                    if (result.length > 0)
                        res.json(true);
                    else
                        res.json(false);
                }
                catch (error) {
                    console.log(error);
                }
            });
        });
    }
    obtenerTiendas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("Select * from TIENDAS", (err, result, fields) => {
                res.json(result);
            });
        });
    }
    obtenerUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query("Select * from USUARIOS", (err, result, fields) => {
                res.json(result);
            });
        });
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
    agregarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            let id_tienda;
            const sqlTienda = "Select Id_Tienda from TIENDAS where Idpdv = ?";
            const sql = "Insert into USUARIOS (Usuario, Password, Id_Tienda) values (?,?,?)";
            yield database_1.default.query(sqlTienda, [data.IDPDV], (err, result) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err)
                        throw err;
                    id_tienda = result[0].Id_Tienda;
                    yield database_1.default.query(sql, [data.USUARIO, data.PASSWORD, id_tienda], (err, result2) => {
                        try {
                            if (err)
                                throw err;
                            res.json(result2);
                        }
                        catch (error) {
                            console.log(error);
                        }
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    eliminarTiendas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    eliminarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "Delete from USUARIOS;";
            const sql2 = "ALTER TABLE USUARIOS AUTO_INCREMENT = 1";
            yield database_1.default.query(sql, (err, result) => {
                console.log(result);
            }); //Eliminamos Usuarios
            yield database_1.default.query(sql2, (err, result) => {
                res.json(result);
            }); //Inicializamos incrementos en 1
        });
    }
}
exports.indexController = new IndexController();
