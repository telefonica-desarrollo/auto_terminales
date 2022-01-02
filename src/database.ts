import mysql from "mysql";

const con = mysql.createConnection({
    host: "10.140.110.15",
    port: 3306,
    user: "temm",
    password: "t3kn312021",
    database: "terminales"
})

con.connect( (err) => {
    try {
        if(err) throw "Error de Conexion"
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);
    }
})

export default con;