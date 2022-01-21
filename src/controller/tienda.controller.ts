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
        const sql = `Insert into TIENDAS (Territorio, Region, Subdirector_Regional, Subdirector_Territorial, 
                    Lider_Interno, Lider_Socio_Comercial, Staff, Idpdv, Nombre_Tienda, Socio_Comercial, Sap, Status) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;

        await con.query(sql, [data.TERRITORIO, data.REGION, data.SUBDIRECTOR_REGIONAL,
            data.SUBDIRECTOR_TERRITORIAL, data.LIDER_INTERNO, data.LIDER_SOCIO_COMERCIAL    , data.STAFF, data.IDPDV,
            data.TIENDA, data.SOCIO_COMERCIAL, data.SAP, data.STATUS], (err, result) => {
            try {
                if(err) throw err
                res.json(result)
            } catch (error) {
                console.log(error);
            }
        })
    }
    async modificarTienda(req: Request, res: Response){
        const data: any = req.body;
        console.log(data);
        
        const sql = `UPDATE TIENDAS SET Territorio=?, Region=?, Subdirector_Regional= ?, Subdirector_Territorial = ?, Lider_Interno = ?,
        Lider_Socio_Comercial= ?, Staff=?, Idpdv=?, Nombre_Tienda=?, Socio_Comercial=?, Sap=?, Status=?
        WHERE Id_Tienda=?;`
        
        await con.query(sql, [data.TERRITORIO, data.REGION, data.SUBDIRECTOR_REGIONAL,
            data.SUBDIRECTOR_TERRITORIAL, data.LIDER_INTERNO, data.LIDER_SOCIO_COMERCIAL    , data.STAFF, data.IDPDV,
            data.TIENDA, data.SOCIO_COMERCIAL, data.SAP, data.STATUS, data.ID_TIENDA], (err, result) => {
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
            if(err) res.json(err)
            res.json(result)
        }) //Eliminamos Usuarios
        await con.query(sql2, (err, result) => {
            console.log(result);
        }) //Inicializamos incrementos en 1
    }
}

export const tiendaController = new TiendaController();