import * as EXcelJS from "exceljs"
import path from "path"

let fechaActual: any = new Date().getTime()


let data: any = []
let promociones: any;
let i = 0

export async function promocionesPospago(){
    let woorkbook = new EXcelJS.Workbook();
    const documento = path.join(__dirname + "./../docs/POSPAGO_201121.xlsx")
    
    await woorkbook.xlsx.readFile(documento).then(function() {
        var woorksheet = woorkbook.getWorksheet("Promociones")
        woorksheet.eachRow((row, rowNumber)=>{
        
            if(rowNumber > 6 ){    
                let fechaInicio: any = row.getCell(15).value
                fechaInicio = new Date(fechaInicio).getTime();
                
                
                let fechaFinal: any = row.getCell(16).value
                fechaFinal = new Date(fechaFinal).getTime();
                fechaFinal = fechaFinal + 25200000                 
                
                if(fechaInicio < fechaActual && fechaActual < fechaFinal){
                    data = []
                    data.SKU = row.getCell(6).value;
                    data.PVP = row.getCell(9).value
                    data.PORCENTAJE = row.getCell(12).result
                    data.rownumber = rowNumber
                    i++;

                    if(!promociones) promociones = [data]
                    else promociones.push(data)
                } 
            }
        })
    })

    return promociones;
}