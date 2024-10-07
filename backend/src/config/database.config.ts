import {Pool} from 'pg';

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'students',
    password:'12Jan2001@',
    port:5432
})

export default pool;