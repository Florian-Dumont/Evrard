import Query from "../../model/query.js";

function home (req, res) {

    res.status(200).render("admin/layout", {subTemplate: null});
}
    
async function story (req, res) {
    const query = "SELECT * FROM story";
    const [datas] = await Query.find(query);
    res.status(200).render("admin/layout", {subTemplate: "story", datas });
}

async function user (req, res) {
    const query = "SELECT * FROM user";
    const [datas] = await Query.find(query);
    res.status(200).render("admin/layout", {subTemplate: "user", datas});
}





export {home, story, user}