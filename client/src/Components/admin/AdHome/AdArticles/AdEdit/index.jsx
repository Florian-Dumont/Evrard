import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import BackButton from "../../../../utils/BackButton";

function AdEdit() {

    const [allProduct, setAllProduct] = useState("")

    useEffect(() => {
        async function getAllProduct() {
            try {
                const productResult = await (
                    await fetch("/api/v1/product/allproduct")
                ).json()
                setAllProduct(productResult.datas)

            } catch (error) {
                console.log(error)

            }

        }
        getAllProduct();

    }, [])


    return (
        <>
            <BackButton/>
            <h1 className="edit-title">Edition de produit</h1>

            <table className="main-edit-tabs">
                <thead className="name-edit-tabs">
                    <tr ><th >Images</th>
                        <th>Référence</th>
                        <th>Nom du produit</th>                        
                        <th>Prix</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>

                <tbody>
                    {!allProduct ? (<>
                        <tr>
                            <th>Aucun produit trouvé</th>
                        </tr>
                    </>
                    ) : ( allProduct.map((product)=>
                    <>
                        <tr>
                            <th ><img className="edit-tabs-img" src={`/img/${product.url_image}`} alt="" /></th> 
                            <th>{product.reference}</th>
                            <th>{product.label_1}</th>                            
                            <th>{product.price}</th>
                            <th><Link to ={`/admin/true/update/${product.id}`} className="edit-pen"><FontAwesomeIcon icon={faPenToSquare} /></Link></th>
                            <th><Link to =""className="edit-trash"><FontAwesomeIcon icon={faTrashCan} /></Link></th>
                        </tr>
                    
                        

                    </>
                    ))}


                </tbody>


                


            </table>













        </>
    )
}
export default AdEdit