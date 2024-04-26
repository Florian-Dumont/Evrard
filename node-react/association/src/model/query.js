import pool from "../config/db.js"

class Query{

    static async find(query){
        return await pool.query(query);
    }
    
    static async findByValue(query, value){
        return await pool.query(query, [value]);
    }

    // data = {
    //     label: "lorem",
    //     content: "lorem ipsum",
    //     date: "12/04/2023"
    // }

    static async write(query, data){
        
        return await pool.query(query, [...Object.values(data)]); //["lorem", "lorem ipsum"]
    }


}

export default Query