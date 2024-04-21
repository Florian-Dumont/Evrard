import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import AdArticles from "../index.jsx";
import PictureUpdate from "./pictureUpdate.jsx";
import BackButton from "../../../../utils/BackButton.jsx";
import ProductUpdate from "./Details/detailsUpdate.jsx";

function AdEditProduct() {

    const params = useParams();
    const [product, setProduct] = useState("");

    useEffect(() => {
        async function getProduct() {
            try {

                const datas = await fetch('/api/v1/product/' + params.id);
                const json = await datas.json();
                setProduct(json);                

            } catch (error) {
                throw Error(error);
            }
        }
        getProduct();

    }, []);
    console.log("product", product)
    return (
        <>

            { product ? (

                <>
                    <BackButton/>
                    <h2 className="labelEditPanel">{product[0].label_1}</h2>

                    <section>
                        <articles>            
                            
                        </articles>
                            <PictureUpdate/>
                        <articles>
                            <ProductUpdate/>
                        </articles>

                    </section>

                </>

            ) : (<>Chargement ...</>)}






        </>


    )
};

export default AdEditProduct;