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
        const query = "SELECT * from product INNER JOIN products_details ON product.id = products_details.product_id INNER JOIN details ON details.id= products_details.details_id INNER JOIN categories ON product.categories_id = categories.id WHERE product.categories_id = categories.id "
        const [datas] = await Query.find(query)
        res.status(200).json({datas})
}
const getByValues = async (req,res) =>{
    const query = "SELECT * from product INNER JOIN products_details ON product.id = products_details.product_id INNER JOIN details ON details.id = products_details.details_id WHERE product.label_1 = ?"
    const [datas] = await Query.findByDatas(query, req.params)
    res.status(200).json({datas})
}
export {getCategories,getAvgProduct,getProductByCategories,getByValues};