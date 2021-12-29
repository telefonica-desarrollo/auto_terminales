"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes();
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
