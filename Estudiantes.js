import consulta from "./pool.js";

/* const consulta = pool.consulta;
const mayoresDe25 = pool.mayoresDe25; */

class Estudiantes {
    constructor(nombres, apellidos, edad, nro_identificacion) {
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.edad = edad;
        this.nro_identificacion = nro_identificacion;
    }

    static findAll(query) {
        return new Promise(async (resolve, reject) => {
            try {
                let resultado = await consulta(query);
                return resolve(resultado);
            } catch (error) {
                reject(error);
            }
        });
    }

    createUser() {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: `INSERT INTO estudiantes(nombres, apellidos, edad, nro_identificacion) VALUES($1,$2,$3,$4) returning id, nombres, apellidos, edad, nro_identificacion`,
                    values: [this.nombres, this.apellidos, this.edad, this.nro_identificacion],
                };
                let resultado = await consulta(query);
                return resolve(resultado);
            } catch (error) {
                console.log(error)
                reject(error);
            }
        })
    };


    static updateUser(id, nombres, apellidos, edad, nro_identificacion) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: 'UPDATE estudiantes SET nombres=$2, apellidos=$3, edad=$4, nro_identificacion=$5 WHERE id = $1',
                    values: [id, nombres, apellidos, edad, nro_identificacion],
                };
                let resultado = await consulta(query);
                return resolve(resultado);
            } catch (error) {
                reject(error);
            }
        });
    }


    static deleteUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let query = {
                    text: `DELETE FROM estudiantes WHERE id=$1`,
                    values: [id],
                };
                let resultado = await consulta(query);
                return resolve(resultado);
            } catch (error) {
                reject(error)
            }
        })
    }

};






export default Estudiantes;

