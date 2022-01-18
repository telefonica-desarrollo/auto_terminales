import { Request, Response } from 'express';
import con from "../database" 

class UsuarioController{
    constructor(){
        
    }
    
    async validarUsuario(req: Request, res: Response){
        const data: any= req.body;
        console.log(data);
        
        const sql = "Select * from USUARIOS where Usuario = ? && Password = ?"
        await con.query(sql , [data.Usuario, data.Password] , (err, result) => {
            try {
                if(err) throw "Peticion no validaa";
                if(result.length > 0) res.json(result)
                else res.json(false)     

            } catch (error) {
                console.log(error);
            }
        })
    }
    async obtenerUsuarios(req: Request, res: Response){
        await con.query("Select * from USUARIOS", (err, result, fields) => {
            res.json(result)
        });
    }
    async obtenerUsuario(req: Request, res: Response){
        const data: any  = req.body;
        console.log(data);
        
        const sql = "Select * from USUARIOS u join TIENDAS t on u.Id_Tienda=t.Id_Tienda and  u.Usuario = ?";
        await con.query(sql, [data.usuario],  (err, result, fields) => {
            try {
                if(err) throw err
                res.json(result[0]);
            } catch (error) {
                console.log(err);
            }
        });
    }
    async agregarUsuario(req: Request, res:Response){
        const data: any = req.body;
        console.log(data);
        let id_tienda: number | undefined;

        const sqlTienda = "Select Id_Tienda from TIENDAS where Idpdv = ?"
        const sql = "Insert into USUARIOS (Usuario, Password, Id_Tienda) values (?,?,?)"
        
        await con.query(sqlTienda, [data.IDPDV], async (err, result) => {
            try {
                if(err) throw err
                if(result.length > 0){
                    id_tienda = result[0].Id_Tienda
                    await con.query(sql, [data.USUARIO, data.PASSWORD, id_tienda], (err, result2) => {
                        try {
                            if(err) throw err
                            res.json(result2)
                        } catch (error) {
                            console.log(error);
                        }
                    })
                }else{
                    res.json("No existe idpdv")
                }
            } catch (error) {
                console.log(error);
            }
        })
    }
    async eliminarUsuarios(req: Request, res:Response){
        const sql = "Delete from USUARIOS;"
        const sql2 = "ALTER TABLE USUARIOS AUTO_INCREMENT = 1"
        await con.query(sql, (err, result) => {
            console.log(result);
        }) //Eliminamos Usuarios
        await con.query(sql2, (err, result) => {
            res.json(result)
        }) //Inicializamos incrementos en 1
    }
}

export const usuarioController = new UsuarioController();