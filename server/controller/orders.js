import Query from "../model/Query.js";


const getProductCartByRef = async (req, res) => {
    try {
    const query = "SELECT * FROM details JOIN picture ON details.id = picture.detail_id JOIN product ON product.id = details.product_id WHERE details.reference = ? LIMIT 1";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    } else {        
        res.status(200).json(datas);
        return;
    } 
    } catch (error) {
        throw Error(error);
    }   
};

export { getProductCartByRef };