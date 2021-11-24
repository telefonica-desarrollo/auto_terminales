import * as EXcelJS from "exceljs"
import * as fs from "fs"
import path from "path"
import * as promocionesPg from "./promocionesPrepago"

let data: any = []
let tiendas = JSON.parse(fs.readFileSync("./data/tiendas.txt", "utf8"));

let woorkbook = new EXcelJS.Workbook();
const documento = path.join(__dirname + "/docs/Terminales.xlsx")

const promocionesPrepago =  promocionesPg.promocionesPrepago()
const promocionesPospago =  promocionesPg.promocionesPrepago()

woorkbook.xlsx.readFile(documento).then(function() {
    var woorksheet = woorkbook.worksheets[0]
    woorksheet.eachRow((row, rowNumber)=>{
    
        data = []
        data.SKU = row.getCell(1).value
        data.DENOMINACION = row.getCell(2).value
        data.ALMACEN = row.getCell(3).value
        data.CANTIDAD = row.getCell(5).value
        data.MARCA = row.getCell(6).result
        data.PRECIO = row.getCell(7).result
        data.IDPDV = row.getCell(9).result
        
        tiendas.forEach((tienda: any)=>{
            if(tienda.IDPDV == data.IDPDV){
              if(!tienda.TERMINALES) tienda.TERMINALES = []
              tienda.TERMINALES.push(data)
            }
        })
    })
    
})



