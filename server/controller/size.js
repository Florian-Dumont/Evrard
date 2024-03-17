import Query from "../model/Query.js";


const getSizeByProductId = async (req,res) => {
    try {
        const query = "SELECT * FROM size WHERE product_id = ? ORDER BY label";
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
const getSizeById = async (req,res) => {
    try {
        const query = "SELECT * FROM size WHERE id = ?";
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

const updateSize = async (req,res) => {
    try {
        const datas = {
            label: req.body.label,
            color : req.body.color,
            // quantity: req.body.quantity,
            id: req.body.id,
                       };
        console.log(datas)
        const query ="UPDATE size SET label = ?, color = ? WHERE id = ?";
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
export {getSizeByProductId , getSizeById, updateSize} ;