import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore} from "firebase/firestore";
import * as fs from "fs"

const firebaseConfig = {
  apiKey: "AIzaSyBx3skrryKQrR722kr3hEGir2tsA4h_u1M",
  authDomain: "terminales-cc1c5.firebaseapp.com",
  projectId: "terminales-cc1c5",
  storageBucket: "terminales-cc1c5.appspot.com",
  messagingSenderId: "205855274483",
  appId: "1:205855274483:web:b4d8d73992a167dec88e86"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collection_data = collection(db, "Tiendas");
let tiendasDB: any = []

export async function obtenerTienda (){
    const tiendas = await getDocs(collection_data)
    tiendas.forEach((tienda)=> {
        let tiendaMod = tienda.data();
        tiendaMod.fid = tienda.id;
        tiendasDB.push(tiendaMod)
    })
    try {
        fs.writeFileSync("./tiendas.txt", JSON.stringify(tiendasDB))
        console.log("Guardado");
    } catch (error) {
        console.log("Error xd");
    }

}