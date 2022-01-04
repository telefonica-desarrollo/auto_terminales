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
exports.promocionesPospago = void 0;
const EXcelJS = __importStar(require("exceljs"));
const path_1 = __importDefault(require("path"));
let fechaActual = new Date().getTime();
let data = {};
let promociones;
let i = 0;
function promocionesPospago() {
    return __awaiter(this, void 0, void 0, function* () {
        let woorkbook = new EXcelJS.Workbook();
        const documento = path_1.default.join(__dirname + "./../docs/POSPAGO_021221.xlsx");
        yield woorkbook.xlsx.readFile(documento).then(function () {
            var woorksheet = woorkbook.getWorksheet("PROMOCIONES DICIEMBRE");
            woorksheet.eachRow((row, rowNumber) => {
                if (rowNumber > 4) {
                    let fechaInicio = row.getCell(15).value;
                    fechaInicio = new Date(fechaInicio).getTime();
                    let fechaFinal = row.getCell(16).value;
                    fechaFinal = new Date(fechaFinal).getTime();
                    fechaFinal = fechaFinal + 8.64e+7 + 2.52e+7;
                    if (fechaInicio < fechaActual && fechaActual < fechaFinal) {
                        data = {};
                        data.MARCA = row.getCell(4).value;
                        data.SKU = row.getCell(6).value;
                        data.MODELO = row.getCell(8).value;
                        data.PVP = row.getCell(9).value;
                        data.PORCENTAJE = row.getCell(12).result;
                        // data.ROWNUMBER = rowNumber
                        i++;
                        if (!promociones)
                            promociones = [data];
                        else
                            promociones.push(data);
                    }
                }
            });
        });
        return promociones;
    });
}
exports.promocionesPospago = promocionesPospago;
