import express, {Application} from "express";
import indexRoutes from "./routes/index.routes";

class Server{
    public app: Application;

    constructor(){
        this.app = express()
        this.routes()
    }
    routes(){
        this.app.use("/", indexRoutes)
    }
    start(){
        this.app.listen(3000, ()=>{
            console.log("Servidor en puerto 3000 -- Terminales");
        })
    }

}

const server = new Server();
server.start();
