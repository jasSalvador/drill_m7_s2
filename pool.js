import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'practica_db',
    user: 'node_user',
    password: 'node',
});

/* pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
}); */

const consulta = (query) => {
    return new Promise(async (resolve, reject) => {
        let cliente;
        try {
            cliente = await pool.connect();
            const result = await cliente.query(query);
            resolve(result.rows);
        } catch (error) {
            reject(error);
        } finally {
            try {
                if (cliente) {
                    cliente.release();
                    console.log('Cliente liberado')
                }
            } catch (error) {
                console.log(error)
            }
        }
    });
};




export default consulta;

