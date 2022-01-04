import {Router} from 'express';
import {indexController} from "../controller/index.controller"
import {usuarioController} from "../controller/usuario.controller"
import {tiendaController} from "../controller/tienda.controller"


class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        //Usuarios
        this.router.post("/login", usuarioController.validarUsuario)
        this.router.get("/obtener/usuarios", usuarioController.obtenerUsuarios)
        this.router.delete("/eliminar/usuarios", usuarioController.eliminarUsuarios)
        this.router.post("/agregar/usuario", usuarioController.agregarUsuario)
        
        //Tiendas
        this.router.get("/obtener/tiendas", tiendaController.obtenerTiendas)
        this.router.post("/agregar/tienda", tiendaController.agregarTienda)
        this.router.delete("/eliminar/tiendas", tiendaController.eliminarTienda)


        //Obtener <------------------------------------------------------------------------------------
        this.router.post("/obtener/inventario", indexController.obtenerInventario)

        

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;