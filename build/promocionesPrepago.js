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
exports.promocionesPrepago = void 0;
const EXcelJS = __importStar(require("exceljs"));
const path_1 = __importDefault(require("path"));
let fechaActual = new Date().getTime();
let data = [];
let promociones;
let i = 0;
function promocionesPrepago() {
    let woorkbook = new EXcelJS.Workbook();
    const documento = path_1.default.join(__dirname + "/docs/PREPAGO_201121.xlsx");
    woorkbook.xlsx.readFile(documento).then(function () {
        var woorksheet = woorkbook.getWorksheet("Equipos en Promoción");
        woorksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 10) {
                let fechaInicio = row.getCell(13).value;
                fechaInicio = new Date(fechaInicio).getTime();
                let fechaFinal = row.getCell(14).value;
                fechaFinal = new Date(fechaFinal).getTime();
                fechaFinal = fechaFinal + 25200000;
                if (fechaInicio < fechaActual && fechaActual < fechaFinal) {
                    i++;
                    data = [];
                    data.SKU = row.getCell(5).value;
                    data.PVP = row.getCell(8).value;
                    data.PORCENTAJE = row.getCell(12).value;
                    data.rownumber = rowNumber;
                    if (!promociones)
                        promociones = [data];
                    else
                        promociones.push(data);
                }
            }
        });
    });
    return promociones;
}
exports.promocionesPrepago = promocionesPrepago;
