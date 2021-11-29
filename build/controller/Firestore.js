"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerTienda = exports.subirData = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const fs = __importStar(require("fs"));
const firebaseConfig = {
    apiKey: "AIzaSyBx3skrryKQrR722kr3hEGir2tsA4h_u1M",
    authDomain: "terminales-cc1c5.firebaseapp.com",
    projectId: "terminales-cc1c5",
    storageBucket: "terminales-cc1c5.appspot.com",
    messagingSenderId: "205855274483",
    appId: "1:205855274483:web:b4d8d73992a167dec88e86"
};
const app = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, firestore_1.getFirestore)(app);
const collection_data = (0, firestore_1.collection)(db, "Tiendas");
let tiendasDB = [];
function subirData(tiendas) {
    return __awaiter(this, void 0, void 0, function* () {
        tiendas.forEach((tienda) => {
            const docTienda = (0, firestore_1.doc)(collection_data, tienda.fid);
            // modificar un documento
            // setDoc(docTienda, tienda)
            // console.log("A huevo papi");
        });
        // Leer info de un documento
        // const dataSnapshot = await getDoc(docTienda)
        // const data = dataSnapshot.data();
        // console.log(data);
    });
}
exports.subirData = subirData;
function eliminarData(tiendas) {
    const doc2 = (0, firestore_1.doc)(collection_data, tiendas[1].fid);
    // tiendas[1].PROMOCIONES_PREPAGO = [];
    // tiendas[1].PROMOCIONES_POSPAGO = [];
    // setDoc(doc2, tiendas[1])
}
function obtenerTienda() {
    return __awaiter(this, void 0, void 0, function* () {
        const tiendas = yield (0, firestore_1.getDocs)(collection_data);
        tiendas.forEach((tienda) => {
            let tiendaMod = tienda.data();
            tiendaMod.fid = tienda.id;
            tiendasDB.push(tiendaMod);
        });
        try {
            fs.writeFileSync("./tiendas.txt", JSON.stringify(tiendasDB));
            console.log("Guardado");
        }
        catch (error) {
            console.log("Error");
        }
    });
}
exports.obtenerTienda = obtenerTienda;
