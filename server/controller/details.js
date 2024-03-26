import Query from "../model/Query.js";


const getDetailsByProductId = async (req,res) => { // maj avec BDD Sylvain - controler le front
    try {
        const query = "SELECT * FROM details JOIN product ON details.product_id = product.id WHERE product_id = ? ORDER BY size.label";
        const [datas] = await Query.findByDatas(query, req.params);

        // console.log(req.params);

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
        const query = "SELECT * FROM details WHERE id = ?";
        const [datas] = await Query.findByDatas(query, req.params);

        // console.log(req.params);

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

const updateDetails = async (req,res) => { // maj avec BDD Sylvain - controler le front
    try {
        const datas = {
            size: req.body.label,
            reference : req.body.reference,
            price : req.body.price,
            color : req.body.color,            
            quantity : req.body.quantity,            
            id: req.body.id,
                       };
        console.log(datas)
        const query ="UPDATE details SET size = ?, reference = ?, price = ?, color = ?, quantity = ? WHERE id = ?";
        const result = await Query.write(query, datas)

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
export {getDetailsByProductId , getDetailsById, updateDetails} ;