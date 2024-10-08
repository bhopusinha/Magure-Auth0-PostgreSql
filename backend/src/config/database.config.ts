// import {Pool} from 'pg';

import {DataSource} from 'typeorm';
import { User } from '../api/user/user.entity';

export const AppDataSource = new DataSource({
    type:'postgres',
    username:'postgres',
    host:'localhost',
    database:'students',
    password:'12Jan2001@',
    port:5432,
    entities: [User],
    synchronize: true,
});



// const pool = new Pool({
//     user:'postgres',
//     host:'localhost',
//     database:'students',
//     password:'12Jan2001@',
//     port:5432
// })

// export default pool;


export default AppDataSource;