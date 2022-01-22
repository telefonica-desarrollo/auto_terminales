import express, {Application} from "express";
import morgan from "morgan";
import cors from "cors"
import indexRoutes from "./routes/index.routes";

// import {con} from "./database"

class Server{
    public app: Application;

    constructor(){
        // con
        this.app = express()
        this.config()
        this.routes()
    }
    config(): void{
        this.app.use(morgan("dev"))
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb' }))
        this.app.use(cors())
    }
    routes(): void{
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
