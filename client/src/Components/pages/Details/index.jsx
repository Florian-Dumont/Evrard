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
            {console.log(belt)}
            <h1> soon </h1>
            <div>
                <img src={"/img/" + belt.url_image} alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
                <img src="" alt="" />
            </div> 
            <div>           
                <p>{belt.label_1}</p> 
                <p>{belt.price}</p>
            </div>
            <div>
             <p>{belt.description}</p>
             <p>{belt.color}</p>
             <button>Ajouter au panier ! </button>
            </div>

            
        </>
    )
}
export default Details
