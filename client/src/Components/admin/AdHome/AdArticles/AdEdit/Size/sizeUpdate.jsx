import { useState, useEffect } from "react";
import { useParams , Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare , faTrashCan } from "@fortawesome/free-solid-svg-icons";



function SizeUpdate() {

    const [sizes, setSizes] = useState([]);
    const params = useParams();
    

    useEffect(() => {
        async function getProduct() {
            try {

                const datas = await fetch('/api/v1/size/product/'+ params.id);
                const json = await datas.json();                
                setSizes(json);                

            } catch (error) {
                throw Error(error);
            }
        }
        getProduct();

    }, []);




    return (
        <>

            {!sizes ? (
                <>
                    <p>Pas de tailles de produit existanttes</p>
                </>
            ) : (sizes.map(size =>
                <>
                    <div key={size.id} className="detailpanel">
                        <p className="quantity">Nom du produit : {size.label_1} - Réference : {size.reference} - Taille : {size.label} - Couleur : {size.color}- Prix : {size.price} - Quantité : {size.quantity}</p>

                        <Link to={`/admin/true/update/size/${size.id}`} className="edit-pen"><p><FontAwesomeIcon icon={faPenToSquare} className="fontawesomeBlue" size="xs" /></p></Link>

                        <Link to={`/admin/true//delete/size/${size.id}`}className="edit-trash"><p><FontAwesomeIcon icon={faTrashCan} className="fontawesomeRed" size="xs" /></p></Link>
                    </div>

                </>
            ))}
        </>
    )
}
export default SizeUpdate;