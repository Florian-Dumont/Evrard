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
const getAllProduct = async (req,res)=>{
    const query = "SELECT * from product INNER JOIN products_details ON product.id = products_details.product_id INNER JOIN details ON details.id = products_details.details_id"
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}
const addProduct = async (req, res) => {
    let msg = "";    

    const productData = {
        label_1: req.body.label,
        label_2: req.body.sublabel,
        description: req.body.description,
        price: req.body.price,
        categories_id: req.body.cat_select,
    };
    const detailsData = {
        size: req.body.size_select,
        color: req.body.color,
        url_image: req.body.url_image,
        url_image_2: req.body.url_image_2,
        url_image_3: req.body.url_image_3,
        url_image_4: req.body.url_image_4,
    };

    try {
        // Insertion dans la table product
        const productQuery = "INSERT INTO product(label_1,label_2,description,price,categories_id VALUES(?,?,?,?,?)";
        console.log(req.body.cat_select)
        await Query.write(productQuery, productData);

        // Insertion dans la table details
        const detailsQuery = "INSERT INTO details(size,color,url_image,url_image_2,url_image_3,url_image_4) VALUES(?,?,?,?,?,?";
        await Query.write(detailsQuery, detailsData);

        msg = "Article créé";
        res.status(200).json({ msg });
    } catch (error) {
        console.error(error);
        msg = "Erreur lors de la création de l'article";
        res.status(500).json({ msg, error: error.message });
    }
};



export {getCategories,getAvgProduct,getProductByCategories,getByValues,getAllProduct,addProduct};