//importamos pg
import pg from 'pg';
const {Client} = pg;

const cliente = new Client ({
    host: 'localhost',
    port: 5432,
    database: 'practica_db',
    user: 'node_user',
    password: 'node',
})

cliente.connect()

cliente.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    cliente.end();
});