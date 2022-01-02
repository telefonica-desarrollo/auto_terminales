import { Request, Response } from 'express';
import con from "../database" 

class IndexController{
    tiendas: any = []; 
    constructor(){
        con;
    }

    async obtenerTiendas(req: Request, res: Response){
        await con.query("Select * from TIENDAS", (err, result, fields) => {
            res.json(result)
        });
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

}

export const indexController = new IndexController();