import React from "react";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
 
function Boutique(){

    const [categories, setCategories] = useState(null)
    


    useEffect(()=>{
    
        async function getCategories(){
            try{  
                const categoryResult = await(
                    await fetch("api/v1/product/categories")
                ).json()
                setCategories(categoryResult.datas)  
    
            }catch(error){
                console.log(error)
            }
    
        }
        getCategories();
    },[])
   


    return(
        <main>
            <section>
                
                    {!categories ? (<p>Loading..</p>) : ( categories.map((category)=>(
                        <div key ={category.id}>
                            <Link to={`${category.label}`}>
                            <p>{category.label}</p>
                            <img src={"img/" + category.url_cat_image} alt="" />
                            <p>{category.description}</p>
                            </Link>
                        </div>
                    )) ) 
                    }
                
            </section>
        </main>
    )
}

export default Boutique;