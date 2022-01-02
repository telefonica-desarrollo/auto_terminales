"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
// import {con} from "./database"
class Server {
    constructor() {
        // con
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '10mb' }));
    }
    routes() {
        this.app.use("/", index_routes_1.default);
    }
    start() {
        this.app.listen(3000, () => {
            console.log("Servidor en puerto 3000 -- Terminales");
        });
    }
}
const server = new Server();
server.start();
