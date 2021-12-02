"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EXcelJS = __importStar(require("exceljs"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const promocionesPg = __importStar(require("./controller/promocionesPrepago"));
const promocionesPp = __importStar(require("./controller/promocionesPospago"));
const promocionesRn = __importStar(require("./controller/promocionesRenovacion"));
let data = {};
let contador = 0;
let i = 0;
let tiendas = JSON.parse(fs.readFileSync("./data/tiendas.txt", "utf8"));
let woorkbook = new EXcelJS.Workbook();
const documento = path_1.default.join(__dirname + "/docs/Inventario/INVENTARIO_231121.xlsx");
let promocionesPrepago, promocionesPospago, promocionesRenovaciones;
///////////////////////////////// Promociones de Prepago
promocionesPg.promocionesPrepago().then((dataPrepago) => {
    promocionesPrepago = dataPrepago;
    console.log(promocionesPrepago.length);
}).then(() => {
    ////////////////////////////// Promociones de Pospago
    promocionesPp.promocionesPospago().then((dataPospago) => {
        promocionesPospago = dataPospago;
        console.log(promocionesPospago.length);
    }).then(() => {
        promocionesRn.promocionesRenovaciones().then((dataRenovaciones) => {
            promocionesRenovaciones = dataRenovaciones;
            console.log(promocionesRenovaciones.length);
        }).then(() => {
            ///////////////////////////Excel de Terminales
            woorkbook.xlsx.readFile(documento).then(function () {
                var woorksheet = woorkbook.worksheets[0];
                woorksheet.eachRow((row, rowNumber) => {
                    data = {};
                    const SKU = row.getCell(4).value;
                    const ALMACEN = row.getCell(2).value;
                    if (row.getCell(7).value === "NUEVO") {
                        tiendas.forEach((tienda) => {
                            if (tienda.SAP == ALMACEN) {
                                /////PROCIONES PREPAGO POR INVENTARIO DE CADA PUNTO DE VENTA
                                promocionesPrepago.forEach((promocion) => {
                                    if (promocion.SKU == SKU) {
                                        if (!tienda.PROMOCIONES_PREPAGO)
                                            tienda.PROMOCIONES_PREPAGO = [];
                                        let dataPromocion = {};
                                        dataPromocion.SKU = SKU;
                                        dataPromocion.CANTIDAD = row.getCell(8).value;
                                        dataPromocion.PVP_PRE = promocion.PVP;
                                        dataPromocion.PORCENTAJE_PRE = promocion.PORCENTAJE;
                                        dataPromocion.MODELO = promocion.MODELO;
                                        dataPromocion.MARCA = promocion.MARCA;
                                        dataPromocion.row_PRE = promocion.ROWNUMBER;
                                        contador++;
                                        tienda.PROMOCIONES_PREPAGO.push(dataPromocion);
                                    }
                                });
                                //////PROCIONES POSPAGO POR INVENTARIO DE CADA PUNTO DE VENTA
                                promocionesPospago.forEach((promocionPos) => {
                                    if (promocionPos.SKU == SKU) {
                                        if (!tienda.PROMOCIONES_POSPAGO)
                                            tienda.PROMOCIONES_POSPAGO = [];
                                        let dataPromocion_Pos = {};
                                        dataPromocion_Pos.SKU = SKU;
                                        dataPromocion_Pos.CANTIDAD = row.getCell(8).value;
                                        dataPromocion_Pos.PVP = promocionPos.PVP;
                                        dataPromocion_Pos.PORCENTAJE_POS = promocionPos.PORCENTAJE;
                                        dataPromocion_Pos.MODELO = promocionPos.MODELO;
                                        dataPromocion_Pos.MARCA = promocionPos.MARCA;
                                        dataPromocion_Pos.row = promocionPos.ROWNUMBER;
                                        tienda.PROMOCIONES_POSPAGO.push(dataPromocion_Pos);
                                    }
                                });
                                //     //PROCIONES RENOVACIONES POR INVENTARIO DE CADA PUNTO DE VENTA
                                promocionesRenovaciones.forEach((promocionRen) => {
                                    if (promocionRen.SKU == SKU) {
                                        if (!tienda.PROMOCIONES_RENOVACIONES)
                                            tienda.PROMOCIONES_RENOVACIONES = [];
                                        let dataPromocion_Ren = {};
                                        dataPromocion_Ren.PVP = promocionRen.PVP;
                                        dataPromocion_Ren.PORCENTAJE = promocionRen.PORCENTAJE;
                                        dataPromocion_Ren.MODELO = promocionRen.MODELO;
                                        dataPromocion_Ren.MARCA = promocionRen.MARCA;
                                        contador++;
                                        tienda.PROMOCIONES_RENOVACIONES.push(dataPromocion_Ren);
                                    }
                                });
                            }
                        });
                    }
                });
                console.log(contador);
                fs.writeFileSync("./data/tienda.txt", JSON.stringify(tiendas[0]));
                ///SUBIR DATA A FIRESTORE  
                // firestore.subirData(tiendas)
            });
        });
    });
});
