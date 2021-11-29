import * as EXcelJS from "exceljs"
import * as fs from "fs"
import path from "path"
import * as promocionesPg from "./controller/promocionesPrepago"
import * as promocionesPp from "./controller/promocionesPospago"
import * as firestore from "./controller/Firestore"

let data: any = {}
let contador = 0
let tiendas = JSON.parse(fs.readFileSync("./data/tiendas.txt", "utf8"));

let woorkbook = new EXcelJS.Workbook();
const documento = path.join(__dirname + "/docs/Terminales.xlsx")

let promocionesPrepago: any, promocionesPospago: any;
///////////////////////////////// Promociones de Prepago
promocionesPg.promocionesPrepago().then( (data: any)=>{
    promocionesPrepago = data
    // console.log(promocionesPrepago.length);
}).then(()=> {
    ////////////////////////////// Promociones de Pospago
    promocionesPp.promocionesPospago().then( (data: any)=> {
        promocionesPospago = data;
        // console.log(promocionesPospago.length);
    }).then(()=>{
        ///////////////////////////Excel de Terminales
        woorkbook.xlsx.readFile(documento).then(function() {
            var woorksheet = woorkbook.worksheets[0]
            woorksheet.eachRow((row, rowNumber)=>{
            
                let prom_pre = false, prom_pos = false;
                data = {}


                data.SKU = row.getCell(1).value
                data.DENOMINACION = row.getCell(2).value
                data.ALMACEN = row.getCell(3).value
                data.CANTIDAD = row.getCell(5).value
                data.MARCA = row.getCell(6).result
                data.PRECIO = row.getCell(7).result
                const IDPDV = row.getCell(9).result
                
                tiendas.forEach((tienda: any)=>{
                    if(tienda.IDPDV == IDPDV){
                        //PROCIONES PREPAGO POR INVENTARIO DE CADA PUNTO DE VENTA
                        promocionesPrepago.forEach((promocion: any) => {
                            if(promocion.SKU == data.SKU){
                                if(!tienda.PROMOCIONES_PREPAGO) tienda.PROMOCIONES_PREPAGO = []
                                data.PVP = promocion.PVP;
                                data.PORCENTAJE = promocion.PORCENTAJE;
                                contador++

                                tienda.PROMOCIONES_PREPAGO.push(data)
                            }
                        })
                        //PROCIONES POSPAGO POR INVENTARIO DE CADA PUNTO DE VENTA
                        promocionesPospago.forEach((promocion: any) => {
                            if(promocion.SKU == data.SKU){
                                if(!tienda.PROMOCIONES_POSPAGO) tienda.PROMOCIONES_POSPAGO = []
                                data.PVP = promocion.PVP;
                                data.PORCENTAJE = promocion.PORCENTAJE
                                contador++

                                tienda.PROMOCIONES_POSPAGO.push(data)
                            }
                        })
                    }

                })
            })
            console.log(contador);
            fs.writeFile("./tienda.txt", JSON.stringify(tiendas[0]), ()=> {
                console.log("hecho panas");
            })
            ///SUBIR DATA A FIRESTORE  
            firestore.subirData(tiendas)
        })
    })
})





