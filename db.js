const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: "postgres://default:1ZM7NPLqRSWe@ep-shy-king-27075333-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})

pool.connect(err => {
    if(err) {
        console.log("Connect Error");
    } else {
        console.log("Connect To PostgreSql");
    }
})



module.exports=pool