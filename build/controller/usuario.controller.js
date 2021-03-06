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
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuarioController {
    constructor() {
    }
    validarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Select * from USUARIOS where Usuario = ? && Password = ?";
            yield database_1.default.query(sql, [data.Usuario, data.Password], (err, result) => {
                try {
                    if (err)
                        throw "Peticion no validaa";
                    if (result.length > 0)
                        res.json(result);
                    else
                        res.json(false);
                }
                catch (error) {
                    console.log(error);
                }
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
    obtenerUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log(data);
            const sql = "Select * from USUARIOS u join TIENDAS t on u.Id_Tienda=t.Id_Tienda and  u.Usuario = ?";
            yield database_1.default.query(sql, [data.usuario], (err, result, fields) => {
                try {
                    if (err)
                        throw err;
                    res.json(result[0]);
                }
                catch (error) {
                    console.log(err);
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
                    if (result.length > 0) {
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
                    else {
                        res.json("No existe idpdv");
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
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
exports.usuarioController = new UsuarioController();
