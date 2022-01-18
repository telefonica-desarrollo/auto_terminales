import { Request, Response } from 'express';
import con from "../database" 

class IndexController{
    tiendas: any = []; 
    constructor(){
        con
    }

    async obtenerInventario(req: Request, res: Response){
        const data: any = req.body;
        console.log(data)
        const sql = "Select * from INVENTARIOS where Id_Tienda = ?"
        await con.query(sql, [data.id_tienda], (err, result) => {
            try {
                if(err) throw "Peticion no valida"
                res.json(result)
            } catch (error) {
                console.log(error);
            }
        })
    }
    async obtenerPromocionPrepago(req: Request, res: Response){
        const data: any = req.body;
        console.log(data);
        
        const sql= "Select * from PROMOCIONES_PREPAGO where Id_Tienda = ?"
        await con.query(sql, [data.id_tienda], (err, result) => {
            try {
                if(err) throw "Peticion no valida"
                res.json(result)
            } catch (error) {
                console.log(error);                
            }
        })
    }
   
}

export const indexController = new IndexController();