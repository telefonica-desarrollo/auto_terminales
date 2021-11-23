import * as fs from "fs"
import * as EXcelJS from "exceljs"
import path from "path"

let fechaActual = new Date().getTime()

let data: any = []
let promociones: any [];
let i = 0

export function promocionesPrepago(){
    let woorkbook = new EXcelJS.Workbook();
    const documento = path.join(__dirname + "/docs/Terminales.xlsx")
    
    woorkbook.xlsx.readFile(documento).then(function() {
        var woorksheet = woorkbook.worksheets[0]
        woorksheet.eachRow((row, rowNumber)=>{
        
            let fechaInicio: any = row.getCell(13).value
            fechaInicio = new Date(fechaInicio).getTime();
            
            let fechaFinal: any = row.getCell(14).value
            fechaFinal = new Date(fechaFinal).getTime();
            
            if(fechaInicio < fechaActual && fechaActual < fechaInicio){
                if(i == 0) i=1;
                if(i > 0 ) i++
            }
            
            // data = []
            // data.SKU = row.getCell(1).value
        })
    })
    
}