import { Request, Response } from 'express';
import con from "../database" 

class TiendaController{
    
    async obtenerTiendas(req: Request, res: Response){
        await con.query("Select * from TIENDAS", (err, result, fields) => {
            res.json(result)
        });
    }
    async agregarTienda(req: Request, res: Response){
        const data: any = req.body;
        console.log(data)

        const sql = "Insert into TIENDAS (Nombre_Tienda, Sap, Region, Territorio, Idpdv) VALUES (?,?,?,?,?)"
        await con.query(sql, [data.NOMBRE, data.SAP, data.REGION, data.TERRITORIO, data.IDPDV], (err, result) => {
            try {
                if(err) throw err
                res.json(result)
            } catch (error) {
                console.log(error);
            }
        })
    }
    async eliminarTienda(req: Request, res:Response){
        const sql = "Delete from TIENDAS"
        const sql2 = "ALTER TABLE TIENDAS AUTO_INCREMENT = 1"
        await con.query(sql, (err, result) => {
            res.json(result)
        }) //Eliminamos Usuarios
        await con.query(sql2, (err, result) => {
            console.log(result);
        }) //Inicializamos incrementos en 1
    }
}

export const tiendaController = new TiendaController();