import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductByCategories() {
    const [productByCategories, setProductByCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const params = useParams()

    useEffect(() => {
        async function fetchData() {
            try {
                const categoriesData = await ( await fetch("/api/v1/product/categories")).json();                  
                setCategories(categoriesData.datas);
                
                 const productsData = await ( await fetch("/api/v1/product/" + params.label + "/" + params.id)).json();                 
                setProductByCategories(productsData.datas);

                console.log("Product By Categories:", productsData.datas);
                console.log("Categories:", categoriesData.datas);
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <section>
            {!productByCategories.length || !categories.length ? (
                <p>Loading...</p>
            ) : (
                <>
                    {productByCategories.map( product => product.category_id === params.id (
                    <div key={product.id}>
                        <Link to={product.label_1}>
                            <img src={"img/" + product.url_image} alt="" />
                            <h2>{product.label_1}</h2>
                            <p>{product.price}</p>
                        </Link>
                    </div>
                    ))}

                </>
            )}
        </section>
    );
}

export default ProductByCategories;
