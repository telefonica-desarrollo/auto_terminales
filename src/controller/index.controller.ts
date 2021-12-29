import { Request, Response } from 'express';

class IndexController{
    obtenerTiendas(req: Request, res: Response){
        res.send("Hola mundo desde el controller")
    }
}

export const indexController = new IndexController();