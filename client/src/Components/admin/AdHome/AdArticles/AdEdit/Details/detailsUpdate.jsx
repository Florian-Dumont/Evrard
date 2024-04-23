//label1 // reference // description // price //

import { useState, useEffect } from "react";
import { useParams , Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare , faTrashCan, faBullseye } from "@fortawesome/free-solid-svg-icons";

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

    const handleDelete = (detailsId, productId) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette variante du produit ?");
        if (confirmed) {
            fetch("/api/v1/product/delete_variante/" + detailsId, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ detailsId }),
            });
          window.location.href = `/admin/true/update/${productId}`;
        }
      };
      const handleDeleteB = (productId) => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer la dernière variante du produit ? Ceci entrainera la suppression du produit dans sa totalité");
        if (confirmed) {
            fetch("/api/v1/product/delete_product/" + productId, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({ productId }),
            });
            window.history.back()
        }
      };


    return(
        <>
        <h1 className="labelEditPanel">Information du produit</h1>

        {!product ? (
            <>
            <p>Pas d'information sur le produit existant</p>
            </>
        ):(product.map(prod=>
            <>
                <div key={prod.id} className="detailpanel">
                    <p className="productname">Nom: {prod.label_1}</p>

                    <p>Reference: {prod.reference}</p>
                    <p>Couleur: {prod.color}</p>
                    <p>Description: {prod.description}</p>
                    <p>Taille: {prod.size}</p>
                    <p>Prix: {prod.price} €</p>
                   
                    
                    <Link to={`/admin/true/update/details/${prod.id}`} className="edit-pen"><p><FontAwesomeIcon icon={faPenToSquare} className="fontawesomeBlue" size="xs" /></p></Link>

                    {product.length >= 2 ? (
                    <>
                    <button onClick={() => handleDelete(prod.id, prod.product_id)} className="edit-trash">
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    </>
                    ) : (
                            <>
                            <button onClick={() => handleDeleteB(prod.id, prod.product_id)} className="edit-trash">
                            <FontAwesomeIcon icon={faBullseye} />
                            </button>
                            </>
                        )}
                    
                    {/* <Link to={`/admin/true/delete/details/${product.id}`}className="edit-trash"><p><FontAwesomeIcon icon={faTrashCan} className="fontawesomeRed" size="xs" /></p></Link> */}

                </div>
            </>
        ))}    
        </>
        )
}
export default ProductUpdate;