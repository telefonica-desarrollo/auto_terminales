import { Request, Response } from 'express';
import con from "../database" 

class TerminalController{
    
    //Catalogo de Terminales
    async obtenerTerminales(req: Request, res: Response){
        await con.query("Select * from TERMINALES", (err, result, fields) => {
            res.json(result)
        });
    }
    async agregarTerminal(req: Request, res: Response){
        const data: any = req.body;
        console.log(data)

        const sql = "Insert into TERMINALES (Sku, Modelo, Marca, Payjoy) VALUES (?,?,?,0)"
        await con.query(sql, [data.SKU, data.MODELO, data.MARCA, data.PAYJOY], (err, result) => {
            try {
                if(err) throw err
                res.json(result)
            } catch (error) {
                console.log(error);
            }
        })
    } //Catalgo de Terminales
    async agregarInventario(req: Request, res: Response){
        const data: any = req.body;
        console.log(data)

        const sql= "Insert into INVENTARIO (Cantidad, Id_Tienda, Id_Terminal) VALUES (?,?,?)"
        await con.query(sql, [data.CANTIDAD, data.ID_TIENDA, data. ID_TERMINAL], (err, result) => {
            try {
                if(err) throw err
                res.json(result)
            } catch (error) {
                console.log(error);
            }
        })
    }
    async obtenerInventario(req: Request, res: Response){
        const data: any= req.body
        console.log(data)
        const sql = "Select * from INVENTARIO where Id_Tienda = ?"
        await con.query(sql, [data.ID_TIENDA], (err, result) =>{
            try {
                if(err) throw err
                res.json(result)
            } catch (error) {
                console.log(error) 
            }
        })

    
    
    
    }


    async actualizarPayjoy(req: Request, res: Response){

    }


}

export const terminalController = new TerminalController();