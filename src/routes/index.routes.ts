import {Router} from 'express';
import {indexController} from "../controller/index.controller"

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        this.router.post("/login", indexController.validarUsuario)
        
        //Obtener <------------------------------------------------------------------------------------
        this.router.get("/obtener/tiendas", indexController.obtenerTiendas)
        this.router.post("/obtener/inventario", indexController.obtenerInventario)
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;