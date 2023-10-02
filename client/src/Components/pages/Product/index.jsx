import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ProductByCategories(){

    const [productByCategories, setproductByCategories] = useState(null)
    const [categories, setCategories] = useState(null)
    
    useEffect(()=>{    
        async function getCategories(){
            try{  
                const categoryResult = await (
                    await fetch("api/v1/product/categories")
                ).json()
                console.log(categoryResult)
                setCategories(categoryResult.datas)  
    
            }catch(error){
                console.log(error)
            }
    
        }
        getCategories();
    },[])

    
    useEffect(()=>{
        async function getProductByCategories(){
            try {
                const ProductByCategoriesResult = await (
                    await fetch("/api/v1/product/listing")
                ).json()
                //console.log(ProductByCategoriesResult)
                setproductByCategories(ProductByCategoriesResult.datas)
            } catch (error) {
                console.log(error)
            }
        }
        getProductByCategories();
    },[]);

    return(
        <>
        <section>
            {!productByCategories ? (
                <p>Loading..</p>
            ):(
                <>
                    {productByCategories.filter((product)=> product.categories_id === categories.id).map((product)=>(
                        <div key = {productByCategories.id}>
                            <Link to={`${product.label_1}`}>
                                <img src={"img/" + product.url_image} alt="" />
                                <h2>{product.label_1}</h2>
                                <p>{product.price}</p>
                            </Link>    
                        </div>
                    ))}
                </>
            )}
        </section>
        </>
    )

}
export default ProductByCategories;

