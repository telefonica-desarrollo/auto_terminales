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
        this.router.get("/obtener/usuarios", indexController.obtenerUsuarios)

        this.router.post("/agregar/tienda", indexController.agregarTienda)
        this.router.post("/", indexController.agregarUsuario)

        this.router.delete("/eliminar/usuarios", indexController.eliminarUsuarios)
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;