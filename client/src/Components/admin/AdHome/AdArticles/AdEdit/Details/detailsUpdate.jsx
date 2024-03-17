//label1 // reference // description // price //

import { useState, useEffect } from "react";
import { useParams , Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare , faTrashCan } from "@fortawesome/free-solid-svg-icons";

function ProductUpdate(){

    const [product,setProduct] = useState([])
    const params = useParams();

    useEffect(() =>{
        async function getProduct(){
            try {
                const datas = await fetch("/api/v1/product/"+ params.id)
                const json = await datas.json();
                setProduct(json)
                
            } catch (error) {
                throw Error(error)
            }
        }getProduct();
    },[])

    return(
        <>
        <h1 className="labelEditPanel">Information du produit</h1>

        {!product ? (
            <>
            <p>Pas d'information sur le produit existant</p>
            </>
        ):(product.map(product=>
            <>
                <div key={product.id} className="detailpanel">
                    <p className="quantity">Nom du produit : {product.label_1} - 

                    <p>Reference produit : {product.reference}</p>
                    <p>Couleur du produit : {product.color}</p>
                    <p>Description du produit : {product.description}</p>
                    <p>Prix du produit : {product.price}</p>
                    </p>
                    
                    <Link to={`/admin/true/update/details/${product.id}`} className="edit-pen"><p><FontAwesomeIcon icon={faPenToSquare} className="fontawesomeBlue" size="xs" /></p></Link>

                    <Link to={`/admin/true//delete/details/${product.id}`}className="edit-trash"><p><FontAwesomeIcon icon={faTrashCan} className="fontawesomeRed" size="xs" /></p></Link>

                </div>
            </>
        ))}    
        </>
        )
}
export default ProductUpdate;