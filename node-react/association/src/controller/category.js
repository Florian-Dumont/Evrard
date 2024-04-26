import Query from "../model/query.js";

async function add(req, res) {
    try {
        const query = "INSERT INTO story (label, content, date_added, author) VALUES (?, ?, NOW(), 'admin')";
        await Query.write(query, req.body);
        res.json({ msg: "story added to DB"});
    } catch (error) {
        throw Error(error);
    }
}

export { add };
