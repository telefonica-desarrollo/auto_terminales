import { Request, Response } from 'express';
import con from "../database" 

class PromocionController{
    
    async obtenerPromocionesPrepago(req: Request, res: Response){
        const data: any = req.body;

        const sql = "Select * FROM PROMOCIONES_PREPAGO where Fecha_Inicio <= ? && Fecha_Final >= ?;"
        await con.query(sql, [data.FECHA, data.FECHA], (err, result, fields) => {
            if(err) res.json(err)
            res.json(result)
        });
    }
    async obtenerPromocionesPospago(req: Request, res: Response){
        const data: any = req.body;

        const sql = "Select * FROM PROMOCIONES_POSPAGO where Fecha_Inicio <= ? && Fecha_Final >= ?;"
        await con.query(sql, [data.FECHA, data.FECHA], (err, result, fields) => {
            if(err) res.json(err)
            res.json(result)
        });
    }
    async obtenerPromocionesRenovacion(req: Request, res: Response){
        const data: any = req.body;

        const sql = "Select * FROM PROMOCIONES_RENOVACION where Fecha_Inicio <= ? && Fecha_Final >= ?;"
        await con.query(sql, [data.FECHA, data.FECHA], (err, result, fields) => {
            if(err) res.json(err)
            res.json(result)
        });
    }

    async agregarPromocionesPrepago(req: Request, res:Response){
        const data: any = req.body;
        console.log(data);
        const sql = "Insert into PROMOCIONES_PREPAGO values (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,?,?,?)"

        await con.query(sql, [data.PVP, data.DESCUENTO, data.ID_TERMINAL, data.FECHA_INICIO, data.FECHA_FINAL],
             (err, result) => {
                 try {
                     if(err) throw err
                     res.json(result)
                 } catch (error) {
                     console.log(error);
                 }
             })
    }
    async agregarPromocionesPospago(req: Request, res:Response){
        const data: any = req.body;
        console.log(data);
        const sql = "Insert into PROMOCIONES_POSPAGO values (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,?,?,?)"

        await con.query(sql, [data.PVP, data.DESCUENTO, data.ID_TERMINAL, data.FECHA_INICIO, data.FECHA_FINAL],
             (err, result) => {
                 try {
                     if(err) throw err
                     res.json(result)
                 } catch (error) {
                     console.log(error);
                 }
             })
    }
    async agregarPromocionesRenovacion(req: Request, res:Response){
        const data: any = req.body;
        console.log(data);
        const sql = "Insert into PROMOCIONES_RENOVACION values (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,?,?,?)"

        await con.query(sql, [data.PVP, data.DESCUENTO, data.ID_TERMINAL, data.FECHA_INICIO, data.FECHA_FINAL],
             (err, result) => {
                 try {
                     if(err) throw err
                     res.json(result)
                 } catch (error) {
                     console.log(error);
                 }
             })
    }
    



}

export const promocionController = new PromocionController();