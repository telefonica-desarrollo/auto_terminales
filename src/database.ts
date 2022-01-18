import mysql from "mysql";

const con = mysql.createConnection({
    host: "10.140.110.15",
    user: "temm",
    password: "t3kn312021",
    database: "terminales",
    port: 3306,
})

con.connect( (err) => {
    try {
        if(err) throw err
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(error);
    }
})

export default con;