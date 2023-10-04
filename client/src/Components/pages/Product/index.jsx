import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProductByCategories() {
    const [productByCategories, setProductByCategories] = useState([]);
    
    const params = useParams()

    useEffect(() => {
        async function fetchData() {
            try {                
                
                 const productsData = await ( await fetch("/api/v1/product/" + params.label + "/" + params.id)).json();                 
                setProductByCategories(productsData.datas);

                
                
                
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    return (
        <section>
            {!productByCategories.length  ? (
                <p>Loading...</p>
            ) : (
                <>
                
                    {productByCategories.map( product => product.categories_id === parseInt(params.id) && (
                    <div key={product.label_1}>
                        <Link to={`${product.label_1} `}>
                            <h2>{product.label_1}</h2>
                        <img src={"/img/" + product.url_image} alt=""  />                            
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
