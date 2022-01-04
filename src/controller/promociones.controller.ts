import { Request, Response } from 'express';
import con from "../database" 

class PromocionController{
    
    async obtenerPromociones(req: Request, res: Response){
        const data: any = req.body;

        const sql = "Select * FROM PROMOCIONES_PREPAGO where Fecha_Inicio <= ? && Fecha_Final >= ?;"
        await con.query(sql, [data.FECHA, data.FECHA], (err, result, fields) => {
            if(err) res.json(err)
            res.json(result)
        });
    }

}

export const promocionController = new PromocionController();