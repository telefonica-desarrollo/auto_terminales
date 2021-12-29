import * as EXcelJS from "exceljs"
import path from "path"

let fechaActual: any = new Date().getTime()


let data: any = {}
let promociones: any;
let i = 0

export async function promocionesPospago(){
    let woorkbook = new EXcelJS.Workbook();
    const documento = path.join(__dirname + "./../docs/POSPAGO_021221.xlsx")
    
    await woorkbook.xlsx.readFile(documento).then(function() {
        var woorksheet = woorkbook.getWorksheet("PROMOCIONES DICIEMBRE")
        woorksheet.eachRow((row, rowNumber)=>{
        
            if(rowNumber > 4 ){    
                let fechaInicio: any = row.getCell(15).value
                fechaInicio = new Date(fechaInicio).getTime();
                
                let fechaFinal: any = row.getCell(16).value
                fechaFinal = new Date(fechaFinal).getTime();
                fechaFinal = fechaFinal + 8.64e+7 + 2.52e+7;                 
                
                if(fechaInicio < fechaActual && fechaActual < fechaFinal){
                    data = {}
                    data.MARCA = row.getCell(4).value
                    data.SKU = row.getCell(6).value;
                    data.MODELO = row.getCell(8).value;
                    data.PVP = row.getCell(9).value
                    data.PORCENTAJE = row.getCell(12).result

                    // data.ROWNUMBER = rowNumber

                    i++;

                    if(!promociones) promociones = [data]
                    else promociones.push(data)
                } 
            }
        })  
    })

    return promociones;
}