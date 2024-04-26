import Query from "../model/query.js";

async function getAll(req, res) {

    try {
        const query = "SELECT * FROM story";
        const [data] = await Query.find(query);
        return data;
    } catch (error) {
        throw Error(error);
    }
}

async function add(req, res) {
    try {
        const query = "INSERT INTO story (label, content, date_added, author) VALUES (?, ?, NOW(), 'admin')";
        
        await Query.write(query, req.body);
        res.redirect("/admin/story");
    } catch (error) {
        throw Error(error);
    }
}

export { add, getAll };
