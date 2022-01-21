import {Router} from 'express';
import {indexController} from "../controller/index.controller"
import {usuarioController} from "../controller/usuario.controller"
import {tiendaController} from "../controller/tienda.controller"
import {terminalController} from "../controller/terminales.controller"
import {promocionController} from "../controller/promociones.controller"


class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(){
        //Usuarios
        this.router.post("/login", usuarioController.validarUsuario)
        this.router.get("/obtener/usuarios", usuarioController.obtenerUsuarios)
        this.router.post("/obtener/usuario", usuarioController.obtenerUsuario)
        this.router.delete("/eliminar/usuarios", usuarioController.eliminarUsuarios)
        this.router.post("/agregar/usuario", usuarioController.agregarUsuario)
        
        //Tiendas
        this.router.get("/obtener/tiendas", tiendaController.obtenerTiendas)
        this.router.post("/agregar/tienda", tiendaController.agregarTienda)
        this.router.post("/modificar/tienda", tiendaController.modificarTienda)
        this.router.delete("/eliminar/tiendas", tiendaController.eliminarTienda)

        //Terminales
        this.router.get("/obtener/terminales", terminalController.obtenerTerminales)
        this.router.post("/agregar/terminal", terminalController.agregarTerminal)

        //Promociones
        this.router.post("/obtener/promociones/prepago", promocionController.obtenerPromocionesPrepago)
        this.router.post("/obtener/promociones/pospago", promocionController.obtenerPromocionesPospago)
        this.router.post("/obtener/promociones/renovacion", promocionController.obtenerPromocionesRenovacion)
        this.router.post("/agregar/promociones/prepago", promocionController.agregarPromocionesPrepago)
        this.router.post("/agregar/promociones/pospago", promocionController.agregarPromocionesPospago)
        this.router.post("/agregar/promociones/renovacion", promocionController.agregarPromocionesRenovacion)
        this.router.delete("/eliminar/promociones/prepago", promocionController.eliminarPromocionesPrepago)
        this.router.delete("/eliminar/promociones/pospago", promocionController.eliminarPromocionesPospago)
        this.router.delete("/eliminar/promociones/renovacion", promocionController.eliminarPromocionesRenovacion)
        

       

        

    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;