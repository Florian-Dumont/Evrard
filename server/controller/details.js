import Query from "../model/Query.js";
import formidable from "formidable";


const getDetailsByProductId = async (req,res) => { // maj avec BDD Sylvain - controler le front
    try {
        const query = "SELECT * FROM details JOIN product ON details.product_id = product.id WHERE details.id = ? ";
        const [datas] = await Query.findByDatas(query, req.params);

/*         console.log("getDetailsByProductId req.params", req.params);
 */
        if(!datas.length){
            res.status(404).json({msg: "données non reconnue id "})
        } else {        
            res.status(201).json(datas);
            return;
        }
        } catch (error) {
            throw Error(error);
        } 
};
const getDetailsById = async (req,res) => {
    try {
        const query = "SELECT * FROM details JOIN product ON details.product_id = product.id WHERE details.id = ?";
        const [datas] = await Query.findByDatas(query, req.params);

/*          console.log("getdetailsbyid",req.params);
 */
        if(!datas.length){
            res.status(404).json({msg: "données non reconnue details"})
        } else {        
            res.status(201).json(datas);
            return;
        }
        } catch (error) {
            throw Error(error);
        } 
};

/* const updateProduct = async (req,res) =>{
    try {
        const datas = {
            label_1: req.body.label,
            description: req.body.description,
            id: req.body.product_id,
        }

        console.log("updateProduct "+ datas)
        const query = "UPDATE product SET label_1 = ?, description = ? WHERE id = ?"
        const result = await Query.write(query, datas)
        res.status(200).json({msg : "update réussi"});
        
    } catch (error) {
        throw Error(error)
    }
} */

const updateDetails = async (req,res) => { // maj avec BDD Sylvain - controler le front
    try {
        const datas = {
            reference : req.body.reference,
            size: req.body.size,
            color : req.body.color,            
            price : req.body.price,
            quantity : req.body.quantity,            
            id: req.body.detailId,
        };      
        const datas2 = {
            label_1: req.body.label,
            description: req.body.description,
            id: req.body.product_id,
        };      
                
              
        console.log("updatedetails "+ datas.id)
        // console.log("updateProduct "+ datas2)
        const query ="UPDATE details SET reference = ?, size = ?,color = ?,price = ?, quantity = ? WHERE id = ?";
        const result = await Query.write(query, datas)
        console.log("result" + result)
                
        
        const query2 = "UPDATE product SET label_1 = ?, description = ? WHERE id = ?"
        const result2 = await Query.write(query2, datas2)
        res.status(200).json({msg : "update réussi"});

        /* if(result.affectedRows > 0){
            res.status(200).json({msg : "update réussi"});
        }else{
            res.status(404).json({msg : "Erreur dans la mise a jour"});
        } */
     } catch (error) {
        throw Error(error);
    }
}

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
        console.log('fields', fields);
                    
        const img = {
            url_image: Object.keys(files).length ? files.image[0].newFilename : "noImg.png",
            detail_id: fields.detailId,
        }

        const query = "INSERT INTO picture (url_image, detail_id) VALUES (?, ?)";
        await Query.write(query, [img.url_image, img.detail_id]);

        res.status(201).json({ msg: "L'image a bien été uploadée" });
    } catch (error) {
        console.error("Erreur lors de l'upload :", error.message);
        res.status(500).json({ error: "Erreur lors de l'upload de l'image." });
    }
};
const addVariante = async (req,res)=>{
    try {
        
        const datas = {
            size : req.body.size,
            reference : req.body.reference, 
            color : req.body.color,
            price : req.body.price,
            product_id : req.body.product_id,
            quantity : req.body.quantity,
        }

        console.log("datas addVariante ------------------ ", datas)
        
        const query = "INSERT INTO details (size,reference,color,price,product_id,quantity) VALUES (?,?,?,?,?,?)";
        await Query.write(query,datas)
        res.status(201).json({msg :"Variante bien ajoutée."})
        
    } catch (error) {
        throw Error(error);
    }
};


const getImagesBydetailsId = async (req, res) => {
    try {
    const query = "SELECT * FROM picture WHERE detail_id = ?";
    const [datas] = await Query.findByDatas(query,req.params);
    res.status(201).json(datas)
    } catch (error) {
        throw Error(error);
    } 
}

export {getDetailsByProductId , getDetailsById, updateDetails, addPic, getImagesBydetailsId,addVariante} ;