import Query from "../model/Query.js";
import formidable from "formidable";

const getCategories = async (req,res) =>{
    
    const query = "Select id,label, description, url_cat_image FROM categories"
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}

const getAvgProduct = async (req,res)=>{
    const query = "SELECT * from product JOIN details ON details.product_id = product.id INNER JOIN picture ON product.id = picture.product_id ORDER BY details.sell_amount DESC LIMIT 4  "
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}

const getProductByCategories = async (req,res)=>{
        const query = "SELECT DISTINCT product.id, product.label_1, details.price, product.categories_id, picture.url_image FROM product INNER JOIN picture ON product.id = picture.product_id INNER JOIN categories ON product.categories_id = categories.id JOIN details ON details.product_id = product.id WHERE product.categories_id = categories.id"
        const [datas] = await Query.find(query)
        res.status(200).json({datas})
}
const getByValues = async (req,res) =>{
    const query = "SELECT * from product INNER JOIN picture ON product.id = picture.product_id INNER JOIN details On product.id = details.product_id WHERE product.label_1 = ?"
    const [datas] = await Query.findByDatas(query, req.params)
    res.status(200).json({datas})
}
const getAllProduct = async (req,res)=>{
    const query = "SELECT *, details.id AS detail_id from product INNER JOIN details ON product.id = details.product_id GROUP BY product.id ORDER BY product.label_1"
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}
const addProduct = async (req, res) => { // maj avec BDD Sylvain - controler le front
    let msg = "";    

    const productData = {
        label_1: req.body.label,
        description: req.body.description,
        categories_id: req.body.catSelect,
    };
    const detailsData = {
        size: req.body.sizeSelect,
        reference: req.body.reference,
        color: req.body.color,
        price: req.body.price,
        quantity: req.body.quantity,  //ajouté
    };

    try {

        // Insertion dans la table product
        const productQuery = "INSERT INTO product(label_1,description,categories_id) VALUES(?,?,?)";
        
        const result = await Query.write(productQuery, productData);

        const productId = result[0].insertId;  // récupère l'id du produit créé

        // Insertion dans la table details
        const detailsQuery = "INSERT INTO details(size,reference,color,price,product_id,quantity) VALUES(?,?,?,?,?,?)";
        await Query.write(detailsQuery, [detailsData.size, detailsData.reference, detailsData.color, detailsData.price, productId, detailsData.quantity]);

        msg = "Article créé";
        res.status(201).json({ msg, productId });
    } catch (error) {
        console.error(error);
        msg = "Erreur lors de la création de l'article";
        res.status(500).json({ msg, error: error.message });
    }
};
const addPic = async (req, res) => {
    const form = formidable({
        uploadDir: "public/img",
        keepExtensions: true,
        allowEmptyFiles: false,            
    });

    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (error, fields, files) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ fields, files });
                }
            });
        });

        console.log('files', files);
        console.log(' ====>fields BIS', fields);
                    
        const img = {
            url_image: Object.keys(files).length ? files.image[0].newFilename : "noImg.png",
            product_id: fields.productId,
        }

        const query = "INSERT INTO picture (url_image, product_id) VALUES (?, ?)";
        await Query.write(query, [img.url_image, img.product_id]);

        res.status(201).json({ msg: "L'image a bien été uploadée" });
    } catch (error) {
        console.error("Erreur lors de l'upload :", error.message);
        res.status(500).json({ error: "Erreur lors de l'upload de l'image." });
    }
};



const getLastProductID = async (req, res) => {
    try {
    const query = "SELECT id FROM product ORDER BY id DESC LIMIT 1";
    const [datas] = await Query.find(query);
    if(!datas.length){
        res.status(404).json({msg: "données non reconnue"})
    } else {        
        res.status(201).json(datas);
        return;
    }
    } catch (error) {
        throw Error(error);
    }
};

const getProductById = async (req,res) => {
    try {
        const query = "SELECT * FROM product INNER JOIN details ON product.id = details.product_id  WHERE product_id = ?";
        const [datas] = await Query.findByDatas(query, req.params);

        console.log(req.params);

        if(!datas.length){
            res.status(404).json({msg: "données non reconnue 122"})
        } else {        
            res.status(201).json(datas);
            return;
        }
        } catch (error) {
            throw Error(error);
        } 
};
const getSizesByProductLabel = async (req,res) => { /// maj avec BDD Sylvain - controler le front
    try {
        const query = "SELECT  details.id, size, product_id, GROUP_CONCAT(color) AS colors, label_1 FROM details JOIN product ON product.id = details.product_id WHERE label_1 = ? GROUP BY size";
        const [datas] = await Query.findByDatas(query, req.params);

        console.log(req.params);

        if(!datas.length){
            res.status(404).json({msg: "données non reconnue sizes"})
        } else {        
            res.status(201).json(datas);
            return;
        }
        } catch (error) {
            throw Error(error);
        } 
};
const getColorBySize = async (req,res) => { /// maj avec BDD Sylvain - controler le front
    try {
        const query = "SELECT color FROM details JOIN product ON product.id = details.product_id WHERE product.label_1 = ? AND details.size = ?";
        const [datas] = await Query.findByDatas(query, req.params);

        console.log(req.params);

        if(!datas.length){
            res.status(404).json({msg: "données non reconnue sizes"})
        } else {        
            res.status(201).json(datas);
            return;
        }
        } catch (error) {
            throw Error(error);
        } 
};

const deleteProduct = async (req,res) => {

    const data = {
        id : req.body.productId,
    }

    try {
        const query ="DELETE FROM product WHERE id = ? ";
        await Query.deleteByValue(query, data);
                
        res.status(201).json({});

     } catch (error) {
        throw Error(error);
    }
}
const deleteProductVariante = async (req,res) => {

    const data = {
        id : req.body.detailsId,
    }

    try {
        const query ="DELETE FROM details WHERE id = ? ";
        await Query.deleteByValue(query, data);
                
        res.status(201).json({});

     } catch (error) {
        throw Error(error);
    }
}


/* "SELECT *, products.id AS product_id, MIN(pictures.id) AS first_picture_id FROM products JOIN pictures ON pictures.product_id = products.id JOIN sizes ON sizes.product_id = products.id WHERE products.title_url = ? AND products.id = ? GROUP BY products.id ORDER BY products.id ASC;" */




export {getCategories,getAvgProduct,getProductByCategories,getByValues,getAllProduct,addProduct,addPic,getLastProductID,getProductById,getSizesByProductLabel,getColorBySize,deleteProduct,deleteProductVariante};