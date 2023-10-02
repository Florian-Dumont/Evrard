import Query from "../../model/Query.js";

async function home (req,res){
    const query = "Select label, description, url_cat_image FROM categories";
    const [data] = await Query.find(query);

    res.json({data})
}

export {home};