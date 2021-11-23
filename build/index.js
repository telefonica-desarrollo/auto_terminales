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
let data = [];
let tiendas = JSON.parse(fs.readFileSync("./data/tiendas.txt", "utf8"));
let woorkbook = new EXcelJS.Workbook();
const documento = path_1.default.join(__dirname + "/docs/Terminales.xlsx");
// woorkbook.xlsx.readFile(documento).then(function() {
//     var woorksheet = woorkbook.worksheets[0]
//     woorksheet.eachRow((row, rowNumber)=>{
//         data = []
//         data.SKU = row.getCell(1).value
//         data.DENOMINACION = row.getCell(2).value
//         data.ALMACEN = row.getCell(3).value
//         data.CANTIDAD = row.getCell(5).value
//         data.MARCA = row.getCell(6).result
//         data.PRECIO = row.getCell(7).result
//         data.IDPDV = row.getCell(9).result
//         tiendas.forEach((tienda: any)=>{
//             if(tienda.IDPDV == data.IDPDV){
//               if(!tienda.TERMINALES) tienda.TERMINALES = []
//               tienda.TERMINALES.push(data)
//             }
//         })
//     })
//     for(let terminal of tiendas[0].TERMINALES){
//       if(terminal.CANTIDAD > 10 ) console.log(terminal)
//     }
// })
///////////////////////////////////////////////////////////////////// Promociones Prepago
