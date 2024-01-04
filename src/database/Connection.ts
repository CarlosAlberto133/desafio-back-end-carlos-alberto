import mysql from 'mysql'

export const createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'resultados',
    })
}