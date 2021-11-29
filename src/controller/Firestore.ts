import { initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, setDoc, getDoc} from "firebase/firestore";
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


export async function subirData(tiendas: any){
    tiendas.forEach((tienda: any)=> {
        const docTienda = doc(collection_data, tienda.fid)
        // modificar un documento
        // setDoc(docTienda, tienda)
        // console.log("A huevo papi");
    })

    // Leer info de un documento
    // const dataSnapshot = await getDoc(docTienda)
    // const data = dataSnapshot.data();
    // console.log(data);

}

function eliminarData(tiendas: any){
    const doc2 = doc(collection_data, tiendas[1].fid)
    // tiendas[1].PROMOCIONES_PREPAGO = [];
    // tiendas[1].PROMOCIONES_POSPAGO = [];
    // setDoc(doc2, tiendas[1])
}

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
        console.log("Error");
    }

}