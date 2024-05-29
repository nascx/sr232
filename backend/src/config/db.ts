import mysql from 'mysql'

import { config } from 'dotenv'

config()

export const db = mysql.createConnection({
    host: '10.12.100.14',
    user: 'sysweb',
    database: 'eletro_check_shoes',
    password: 'ZqkNUCy9DnPjGuSG'
})