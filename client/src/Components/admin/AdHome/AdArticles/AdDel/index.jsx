import React, {useEffect, useState} from "react";

function AdDel(){


    const[allProduct, setAllProduct] = useState("")

        useEffect(()=>{
            async function getAllProduct(){
                try {
                    const productResult = await(
                        await fetch("/api/v1/product/allproduct")
                    ).json()
                    setAllProduct(productResult.datas)
                    
                } catch (error) {
                    console.log(error)
                    
                }

            }
            getAllProduct();

        },[])

    return(
    <>
        <h1>test Delete</h1>

        <section>
            <form action="">

                <label htmlFor="select_prod">Choix du produit a supprimer</label>
                <select 
                name="select_prod" 
                id="select_prod"
                >
                    {!allProduct ? (<option>Loading ...</option>) : (allProduct.map((product)=>(
                        <option value={product.id}>{product.label_1}</option>
                    )))
                    }
                </select>
                <button type="submit">Supprimer</button>
            </form>
        </section>
    </>


    )
}
export default AdDel