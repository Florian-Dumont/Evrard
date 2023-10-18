
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


function Home(){

    const [avgProduct, setAvgProduct] = useState(null)

    useEffect(()=>{
        async function getAvgProduct(){
            try {
                const avgProduct = await ( await fetch ("/api/v1/product/average")
                ).json()
                setAvgProduct(avgProduct.datas)
            } catch (error) {
                console.log(error)
            }
        }getAvgProduct();
    },[])


return(
    <>
        <main>
            <section>
           <h2 className="home-title">Nos meillieurs ventes</h2>
           <div>
            {!avgProduct ? (
                <p>Loading..</p>
            ) : (avgProduct.map((avgPro)=>(
                <div className="pro-ctn" key ={avgProduct.id}>
                    <h2 className="pro-label">{avgPro.label_1}</h2>
                    <img  className="pro-img" src={"img/" + avgPro.url_image} alt="" />
                    <p>{avgPro.description}</p>
                </div>
            )))}
           </div>
           </section>

        </main>
    
    </>
)

    
}
export default Home


//  Warning: Each child in a list should have a unique "key" prop.