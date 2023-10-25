import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Details(){

    const params   = useParams();
    //const [index, setIndex] = useState(0)
    //const navigate = useNavigate()
    console.log(params)

    const [belts, setBelts] = useState(null);

    useEffect(() =>{
        async function getBelts(){
            try {
                const res = await ( 
                    await fetch("/api/v1/product/" + params.label_1)    // /:label/:id/:label_1
                ).json();
                setBelts(res.datas)              
                console.log("info du fetch => " +  res.datas)
                

            } catch (error) {
                console.log(error)
            }
        }
        getBelts()
        console.log("info dispo =>" + belts)
    },[])

    if (!belts) {
        return <p>Loading...</p>;
    }

    const belt = belts[0];


    return(
        <>
        <section className="details-card">          
            <div>
                <img src={"/img/" + belt.url_image} alt="" />
                <div className="details-childimg">
                    <img  src={"/img/" + belt.url_image_2} alt="" />
                    <img  src={"/img/" + belt.url_image_3} alt="" />
                    <img  src={"/img/" + belt.url_image_4} alt="" />
                    
                </div>
            </div>
            <div className="details-descr">
                <div className="details-name">           
                    <p>{belt.label_1}</p> 
                    <p>{belt.price}</p>
                </div>
                <div className="details-color">
                    <div className="wrap">
                        <p>{belt.description} </p>
                    </div>
                    <p>{belt.color}</p>                    
                </div>
                
                 <button>Ajouter au panier ! </button> 
            </div> 
        </section>  

            
        </>
    )
}
export default Details
