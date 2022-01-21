import { Request, Response } from 'express';
import con from "../database" 

class PromocionController{
    
    async obtenerPromocionesPrepago(req: Request, res: Response){npm
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
        const Fecha_Inicio = new Date(data.FECHA_INICIO).toISOString().slice(0,10).replace('T', ' ');
        const Fecha_Final = new Date(data.FECHA_FINAL).toISOString().slice(0,10).replace('T', ' ');
        console.log(Fecha_Inicio);
        const sql = "Insert into PROMOCIONES_PREPAGO (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,1,?,?)"

        await con.query(sql, [data.PVP, data.DESCUENTO, Fecha_Inicio, Fecha_Final],
             (err, result) => {
                 try {
                     if(err) throw err
                     res.json(true)
                 } catch (error) {
                     console.log(error);
                 }
             })
    }
    async agregarPromocionesPospago(req: Request, res:Response){
        const data: any = req.body;
        const Fecha_Inicio = new Date(data.FECHA_INICIO).toISOString().slice(0,10).replace('T', ' ');
        const Fecha_Final = new Date(data.FECHA_FINAL).toISOString().slice(0,10).replace('T', ' ');
        console.log(Fecha_Inicio);
        const sql = "Insert into PROMOCIONES_POSPAGO (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,1,?,?)"

        

        await con.query(sql, [data.PVP, data.DESCUENTO, Fecha_Inicio, Fecha_Final],
             (err, result) => {
                 try {
                     if(err) throw err
                     res.json(true)
                 } catch (error) {
                     console.log(error);
                 }
             })
    }
    async agregarPromocionesRenovacion(req: Request, res:Response){
        const data: any = req.body;
        const Fecha_Inicio = new Date(data.FECHA_INICIO).toISOString().slice(0,10).replace('T', ' ');
        const Fecha_Final = new Date(data.FECHA_FINAL).toISOString().slice(0,10).replace('T', ' ');
        console.log(Fecha_Inicio);
        const sql = "Insert into PROMOCIONES_RENOVACION (Pvp, Descuento, Id_Terminal, Fecha_Inicio, Fecha_Final) values (?,?,1,?,?)"

        

        await con.query(sql, [data.PVP, data.DESCUENTO, Fecha_Inicio, Fecha_Final],
             (err, result) => {
                 try {
                     if(err) throw err
                     res.json(true)
                 } catch (error) {
                     console.log(error);
                 }
             })
    }
    async eliminarPromocionesPrepago(req:Request, res: Response){
         //Borramos todas las promociones
        await con.query("DELETE from PROMOCIONES_PREPAGO", (err, result) => {})
        await con.query("ALTER TABLE PROMOCIONES_PREPAGO AUTO_INCREMENT = 1", (err,result)=>{})
        res.json(true)
    }
    async eliminarPromocionesPospago(req:Request, res: Response){
        //Borramos todas las promociones
       await con.query("DELETE from PROMOCIONES_POSPAGO", (err, result) => {})
       await con.query("ALTER TABLE PROMOCIONES_POSPAGO AUTO_INCREMENT = 1", (err,result)=>{})
       res.json(true)
    }
    async eliminarPromocionesRenovacion(req:Request, res: Response){
         //Borramos todas las promociones
        await con.query("DELETE from PROMOCIONES_RENOVACION", (err, result) => {})
        await con.query("ALTER TABLE PROMOCIONES_RENOVACION AUTO_INCREMENT = 1", (err,result)=>{})
        res.json(true)
    }
    

}

export const promocionController = new PromocionController();