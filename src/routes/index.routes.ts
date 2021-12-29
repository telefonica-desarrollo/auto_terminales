import {Router} from 'express';
import {indexController} from "../controller/index.controller"

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){

        //Obtener <------------------------------------------------------------------------------------
            this.router.get("/", indexController.obtenerTiendas)
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;