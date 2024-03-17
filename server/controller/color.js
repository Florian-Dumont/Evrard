import Query from "../model/Query.js";

const getColorByProductId = async(req,res) => {
    try {
        const query = " SELECT * FROM details WHERE product_id = ?"
        const [datas] = await Query.findByDatas(query, req.params);
        
        if(!datas.length){
            res.status(404).json({msg: " Donnés non reconnue"})
        }else{
            res.status(201).json(datas);
            return
        }
    } catch (error) {
        throw Error(error)
    }
}
const getColorById = async (req,res) => {
    try {
        const query = "SELECT * FROM details WHERE id = ?";
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

const updateColor = async (req,res) => {
    try {
        const datas = {
            label: req.body.label,
            // quantity: req.body.quantity,
            id: req.body.id,
                       };
        console.log(datas)
        const query ="UPDATE details SET color = ? WHERE id = ?";
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

export { getColorByProductId,getColorById,updateColor}