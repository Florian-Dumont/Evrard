import pool from "../config/db.js"

class Query{
    static async find(query){
        return await pool.query(query)
    }
    static async findByDatas(query, datas){
        return await pool.query(query, [...Object.values(datas)]);
    }
}

export default Query;