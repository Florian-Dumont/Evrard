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
                const product = await fetch("/api/v1/product/"+ params.id)
                const json = await product.json();
                setProduct(json)
                
                
            } catch (error) {
                console.log(error)
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
                    <p className="productname">Nom: {product.label_1}</p>

                    <p>Reference: {product.reference}</p>
                    <p>Couleur: {product.color}</p>
                    <p>Description: {product.description}</p>
                    <p>Taille: {product.size}</p>
                    <p>Prix: {product.price} €</p>
                   
                    
                    <Link to={`/admin/true/update/details/${product.id}`} className="edit-pen"><p><FontAwesomeIcon icon={faPenToSquare} className="fontawesomeBlue" size="xs" /></p></Link>

                    <Link to={`/admin/true/delete/details/${product.id}`}className="edit-trash"><p><FontAwesomeIcon icon={faTrashCan} className="fontawesomeRed" size="xs" /></p></Link>

                </div>
            </>
        ))}    
        </>
        )
}
export default ProductUpdate;