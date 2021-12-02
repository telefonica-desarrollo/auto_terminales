import * as EXcelJS from "exceljs"
import * as fs from "fs"
import path from "path"

let fechaActual: any = new Date().getTime()

let data: any = {}
let promociones: any;
let i = 0

export async function promocionesPrepago(){
    let woorkbook = new EXcelJS.Workbook();
    const documento = path.join(__dirname + "./../docs/PREPAGO_261121.xlsx")
    
    await woorkbook.xlsx.readFile(documento).then(function() {
        var woorksheet = woorkbook.getWorksheet("PROMOCIONES")
        woorksheet.eachRow((row, rowNumber)=>{
            if(rowNumber > 7 ){    
                let fechaInicio: any = row.getCell(12).value
                fechaInicio = new Date(fechaInicio).getTime(); 
                
                let fechaFinal: any = row.getCell(13).value
                fechaFinal = new Date(fechaFinal).getTime();
                fechaFinal = fechaFinal + 8.64e+7 + 2.52e+7;    

                if(fechaInicio < fechaActual && fechaActual < fechaFinal){
                    data = {}
                    i++
                    data.MARCA = row.getCell(3).value
                    data.SKU = row.getCell(4).value;
                    data.MODELO = row.getCell(6).value;
                    data.PVP = row.getCell(7).value
                    data.PORCENTAJE = row.getCell(11).value
                    data.ROWNUMBER = rowNumber
                    
                    if(!promociones) promociones = [data]
                    else promociones.push(data)
                } 
            }
        })
        
    })
    return promociones
}