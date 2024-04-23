import pool from "../config/db.js"

class Query{
    static async find(query){
        return await pool.query(query)
    }
    static async findByDatas(query, datas){
        return await pool.query(query, [...Object.values(datas)]);
    }
    static async findByValue(query, value){
        return await pool.query(query,[value]);
    }
    static async write(query,data){
        return await pool.query(query, [...Object.values(data)])
    }
    static async deleteByValue(query,data){
        return await pool.query(query, [...Object.values(data)])
    }
}

export default Query;