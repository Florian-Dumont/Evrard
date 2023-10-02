import Query from "../model/Query.js";

const getCategories = async (req,res) =>{
    
    const query = "Select id,label, description, url_cat_image FROM categories"
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}

const getAvgProduct = async (req,res)=>{
    const query = "SELECT * from product INNER JOIN products_details ON product.id = products_details.product_id INNER JOIN details ON details.id= products_details.details_id  ORDER BY sell_amount DESC LIMIT 4  "
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}

const getProductByCategories = async (req,res)=>{
        const query = "SELECT * from product INNER JOIN products_details ON product.id = products_details.product_id INNER JOIN details ON details.id= products_details.details_id"
        const [datas] = await Query.find(query)
        res.status(200).json({datas})
}
export {getCategories,getAvgProduct,getProductByCategories};