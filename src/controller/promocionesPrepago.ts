import * as EXcelJS from "exceljs"
import path from "path"

let fechaActual: any = new Date().getTime()


let data: any = []
let promociones: any;
let i = 0

export async function promocionesPrepago(){
    let woorkbook = new EXcelJS.Workbook();
    const documento = path.join(__dirname + "./../docs/PREPAGO_201121.xlsx")
    
    await woorkbook.xlsx.readFile(documento).then(function() {
        var woorksheet = woorkbook.getWorksheet("Equipos en Promoción")
        woorksheet.eachRow((row, rowNumber)=>{
        
            if(rowNumber > 10 ){    
                let fechaInicio: any = row.getCell(13).value
                fechaInicio = new Date(fechaInicio).getTime();
                
                
                let fechaFinal: any = row.getCell(14).value
                fechaFinal = new Date(fechaFinal).getTime();
                fechaFinal = fechaFinal + 25200000                 
                
                if(fechaInicio < fechaActual && fechaActual < fechaFinal){
                    i ++;
                    data = []
                    data.SKU = row.getCell(5).value;
                    data.PVP = row.getCell(8).value
                    data.PORCENTAJE = row.getCell(12).value
                    data.rownumber = rowNumber
    
                    if(!promociones) promociones = [data]
                    else promociones.push(data)
                } 
            }
        })
    })
    return promociones
}