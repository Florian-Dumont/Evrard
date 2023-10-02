import pool from "../config/db.js"

class Query{
    static async find(query){
        return await pool.query(query)
    }
}

export default Query;