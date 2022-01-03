import { Request, Response } from 'express';
import con from "../database" 

class IndexController{
    tiendas: any = []; 
    constructor(){
        con;
    }

    async validarUsuario(req: Request, res: Response){
        const data: any= req.body;
        console.log(data);
        
        const sql = "Select * from USUARIOS where Usuario = ? && Password = ?"
        await con.query(sql , [data.usuario, data.password] , (err, result) => {
            try {
                if(err) throw "Peticion no valida";

                if(result.length > 0) res.json(true)
                else res.json(false)     

            } catch (error) {
                console.log(error);
            }
        })
    }
    async obtenerTiendas(req: Request, res: Response){
        await con.query("Select * from TIENDAS", (err, result, fields) => {
            res.json(result)
        });
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
        
        const sql= "Seles * from PROMOCIONES_PREPAGO where Id_Tienda = ?"
        await con.query(sql, [data.id_tienda], (err, result) => {
            try {
                if(err) throw "Peticion no valida"
                res.json(result)
            } catch (error) {
                console.log(error);                
            }
        })
    }
    async agregarTienda(req: Request, res: Response){
        const data: any = req.body;
        console.log(data)

        const sql = "Insert into TIENDAS ()"
    }
}

export const indexController = new IndexController();