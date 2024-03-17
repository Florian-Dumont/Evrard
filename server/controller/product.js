import Query from "../model/Query.js";
import formidable from "formidable";

const getCategories = async (req,res) =>{
    
    const query = "Select id,label, description, url_cat_image FROM categories"
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}

const getAvgProduct = async (req,res)=>{
    const query = "SELECT * from product INNER JOIN picture ON product.id = picture.product_id ORDER BY sell_amount DESC LIMIT 4  "
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}

const getProductByCategories = async (req,res)=>{
        const query = "SELECT * from product INNER JOIN picture ON product.id = picture.product_id INNER JOIN categories ON product.categories_id = categories.id WHERE product.categories_id = categories.id "
        const [datas] = await Query.find(query)
        res.status(200).json({datas})
}
const getByValues = async (req,res) =>{
    const query = "SELECT * from product INNER JOIN picture  ON product.id = picture.product_id INNER JOIN details On product.id = details.product_id WHERE product.label_1 = ?"
    const [datas] = await Query.findByDatas(query, req.params)
    res.status(200).json({datas})
}
const getAllProduct = async (req,res)=>{
    const query = "SELECT * from product INNER JOIN details ON product.id = details.product_id INNER JOIN picture ON product.id = picture.product_id ORDER BY label_1"
    const [datas] = await Query.find(query)
    res.status(200).json({datas})
}
const addProduct = async (req, res) => {
    let msg = "";    

    const productData = {
        label_1: req.body.label,
        reference: req.body.sublabel,
        description: req.body.description,
        price: req.body.price,
        categories_id: req.body.catSelect,
    };
    const detailsData = {
        color: req.body.color,
    };
    const sizesData = {
        size: req.body.size_select,
    };

    try {

       

        // Insertion dans la table product
        const productQuery = "INSERT INTO product(label_1,reference,description,price,categories_id) VALUES(?,?,?,?,?)";
        
        const result = await Query.write(productQuery, productData);

        const productId = result[0].insertId;  // récupère l'id du produit créé

        // Insertion dans la table details
        const detailsQuery = "INSERT INTO details(color, product_id) VALUES(?, ?)";
        await Query.write(detailsQuery, [detailsData.color, productId]);

        //Insertion dans la table size
        const sizeQuery = "INSERT INTO size (size, product_id) VALUES(?, ?)";
        await Query.write(sizeQuery, [sizesData.size, productId]);

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
        console.log('fields BIS', fields);
                    
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
        const query = "SELECT * FROM product INNER JOIN size ON product.id = product_id  WHERE product.id = ?";
        const [datas] = await Query.findByDatas(query, req.params);

        // console.log(req.params);

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


/* "SELECT *, products.id AS product_id, MIN(pictures.id) AS first_picture_id FROM products JOIN pictures ON pictures.product_id = products.id JOIN sizes ON sizes.product_id = products.id WHERE products.title_url = ? AND products.id = ? GROUP BY products.id ORDER BY products.id ASC;" */




export {getCategories,getAvgProduct,getProductByCategories,getByValues,getAllProduct,addProduct,addPic,getLastProductID,getProductById,};