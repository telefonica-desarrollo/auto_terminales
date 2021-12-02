import * as EXcelJS from "exceljs"
import * as fs from "fs"
import path from "path"
import * as promocionesPg from "./controller/promocionesPrepago"
import * as promocionesPp from "./controller/promocionesPospago"
import * as promocionesRn from "./controller/promocionesRenovacion"
import * as firestore from "./controller/Firestore"

let data: any = {}
let contador = 0
let i = 0
let tiendas = JSON.parse(fs.readFileSync("./data/tiendas.txt", "utf8"));

let woorkbook = new EXcelJS.Workbook();
const documento = path.join(__dirname + "/docs/Inventario/INVENTARIO_231121.xlsx")

let promocionesPrepago: any, promocionesPospago: any, promocionesRenovaciones: any;
///////////////////////////////// Promociones de Prepago
promocionesPg.promocionesPrepago().then( (dataPrepago: any)=>{
    promocionesPrepago = dataPrepago
    console.log(promocionesPrepago.length);
}).then(()=> {
    ////////////////////////////// Promociones de Pospago
    promocionesPp.promocionesPospago().then( (dataPospago: any)=> {
        promocionesPospago = dataPospago;
        console.log(promocionesPospago.length);
    }).then(()=>{
        promocionesRn.promocionesRenovaciones().then((dataRenovaciones: any) => {
            promocionesRenovaciones = dataRenovaciones;
            console.log(promocionesRenovaciones.length);
        }).then(()=>{
            ///////////////////////////Excel de Terminales
            woorkbook.xlsx.readFile(documento).then(function() {
                var woorksheet = woorkbook.worksheets[0]
                woorksheet.eachRow((row, rowNumber)=>{
                    data = {}
                    const SKU = row.getCell(4).value
                    const ALMACEN = row.getCell(2).value   

                    if(row.getCell(7).value === "NUEVO"){
                        tiendas.forEach((tienda: any)=>{
                            if(tienda.SAP == ALMACEN){
                                /////PROCIONES PREPAGO POR INVENTARIO DE CADA PUNTO DE VENTA
                                promocionesPrepago.forEach((promocion: any) => {
                                    if(promocion.SKU == SKU){
                                        if(!tienda.PROMOCIONES_PREPAGO) tienda.PROMOCIONES_PREPAGO = []
                                        let dataPromocion: any = {}
                                        dataPromocion.SKU = SKU
                                        dataPromocion.CANTIDAD = row.getCell(8).value
                                        dataPromocion.PVP_PRE = promocion.PVP;
                                        dataPromocion.PORCENTAJE_PRE = promocion.PORCENTAJE;
                                        dataPromocion.MODELO = promocion.MODELO
                                        dataPromocion.MARCA = promocion.MARCA
                                        dataPromocion.row_PRE = promocion.ROWNUMBER
                                        contador++

                                        tienda.PROMOCIONES_PREPAGO.push(dataPromocion)
                                    }
                                })
                                //////PROCIONES POSPAGO POR INVENTARIO DE CADA PUNTO DE VENTA
                                promocionesPospago.forEach((promocionPos: any) => {
                                    if(promocionPos.SKU == SKU){
                                        if(!tienda.PROMOCIONES_POSPAGO) tienda.PROMOCIONES_POSPAGO = []
                                        let dataPromocion_Pos: any ={}
                                        dataPromocion_Pos.SKU = SKU
                                        dataPromocion_Pos.CANTIDAD = row.getCell(8).value
                                        dataPromocion_Pos.PVP = promocionPos.PVP;
                                        dataPromocion_Pos.PORCENTAJE_POS = promocionPos.PORCENTAJE;
                                        dataPromocion_Pos.MODELO = promocionPos.MODELO
                                        dataPromocion_Pos.MARCA = promocionPos.MARCA
                                        dataPromocion_Pos.row = promocionPos.ROWNUMBER

                                        tienda.PROMOCIONES_POSPAGO.push(dataPromocion_Pos)
                                    }
                                })
                            //     //PROCIONES RENOVACIONES POR INVENTARIO DE CADA PUNTO DE VENTA
                                promocionesRenovaciones.forEach((promocionRen: any) => {
                                    if(promocionRen.SKU == SKU){
                                        if(!tienda.PROMOCIONES_RENOVACIONES) tienda.PROMOCIONES_RENOVACIONES = []
                                        let dataPromocion_Ren: any ={}
                                        dataPromocion_Ren.PVP = promocionRen.PVP;
                                        dataPromocion_Ren.PORCENTAJE = promocionRen.PORCENTAJE;
                                        dataPromocion_Ren.MODELO = promocionRen.MODELO
                                        dataPromocion_Ren.MARCA = promocionRen.MARCA
                                        contador++
                                        tienda.PROMOCIONES_RENOVACIONES.push(dataPromocion_Ren)
                                    }
                                })
                            }
                        })
                    }
                })
                console.log(contador);
                fs.writeFileSync("./data/tienda.txt", JSON.stringify(tiendas[0]))

                ///SUBIR DATA A FIRESTORE  
                // firestore.subirData(tiendas)
            })
        })
    })
})





