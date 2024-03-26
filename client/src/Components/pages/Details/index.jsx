import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Details() {
    
    const [belts, setBelts] = useState(null);

    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizeChoice, setSizeChoice] = useState(""); 
    const [colorChoice, setColorChoice] = useState(""); 

   
    const params = useParams();
    
    useEffect(() => {
        async function getSizes(){
            try {
                const sizes = await fetch("/api/v1/product/sizes/" + params.id);
                if (sizes.status === 201) {
                    const json = await sizes.json();
                    setSizes(json);
                }

                /* console.log("sizes.datas", sizes.datas) */
                
            } catch (error) {   
                console.log(error)
                
            }
        }
        getSizes()
    }, [params.id]);

    // Fonction pour récupérer les couleurs disponibles pour une taille spécifique
    useEffect(() => {
        async function getColors(){
            try {
                if (!sizeChoice) {
                    // Si aucune taille sélectionnée, on vide les couleurs
                    setColors([]);
                    return;
                }
                const colorsResponse = await fetch(`/api/v1/product/colors/` + params.id + "/" + sizeChoice);
                if (colorsResponse.ok) {
                    const colorsData = await colorsResponse.json();
                    setColors(colorsData);
                    console.log("colors" , colorsData)
                }
                
            } catch (error) {   
                console.log(error)
            }
        }
        getColors();
    }, [params.id, sizeChoice]);

    // Gestionnaire d'événements pour la sélection de la taille
    const handleSizeChange = (e) => {
        setSizeChoice(e.target.value);
        setColorChoice(""); // Réinitialiser la couleur sélectionnée lors du changement de taille
    };

    // Gestionnaire d'événements pour la sélection de la couleur
    const handleColorChange = (e) => {
        setColorChoice(e.target.value);
    };
    useEffect(() =>{
        async function getBelts(){
            try {
                const res = await ( 
                    await fetch("/api/v1/product/product/" + params.label_1)    // /:label/:id/:label_1
                ).json();
                setBelts(res.datas)
                              
                /* console.log("info du fetch => " +  res.datas) */

            } catch (error) {
                console.log(error)
            }
        }
        getBelts()
        /* console.log("info dispo =>" + belts) */
    },[])

    if (!belts) {
        return <p>Loading...</p>;
    }

    const belt = belts[0];

    console.log("sizes " + belt)

    
    return (
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
                    <p>label {belt.label_1}</p> 
                    <p>prix {belt.price}</p>
                </div>
                <div className="details-color">
                    <div className="wrap">
                        <p>description {belt.description} </p>
                    </div>
                    <p>couleur {belt.color}</p>                    
                </div>

                
                
                  
            </div> 
        
            <select name="size" id="size" onChange={handleSizeChange}>
                        
                    <option value="rien" selected disabled > Selectionner la taille </option>
                    {!sizes ? (<></>) : (sizes.map((size) => (
                        <option
                            key={size.id}
                            value={size.size}
                        >
                            {size.size}
                        </option>
                    )))}
                        
                    </select>

            <select name="colors" id="colors" onChange={handleColorChange} value ={colorChoice}>
                        
                    <option value="" selected disabled > Selectionner la couleur </option>
                    {!colors ? (<><p>pas de couleur</p></>) : (colors.map((color) => (
                        <option
                            key={color.id}
                            value={color.color}
                        >                             
                             {color.color}
                        </option>
                    )))}
                        
                    </select>
                    <button>Ajouter au panier ! </button>
                    </section>
            
        </>
    );
}

export default Details


/* function Details(){

    const params   = useParams();
    //const [index, setIndex] = useState(0)
    //const navigate = useNavigate()
    console.log("clg params " + params.id)

    const [belts, setBelts] = useState(null);
    const [sizes, setSizes] = useState("");
    const [sizeChoice, setSizeChoice] = useState("");
    const [colorChoice, setColorChoice] = useState("");



    useEffect(() =>{
        async function getSizes(){
            try {
                const sizes = await fetch("/api/v1/product/sizes/" + params.id);
                if (sizes.status === 201) {
                    const json = await sizes.json();
                    setSizes(json);
                }

                console.log("sizes.datas", sizes.datas)
                
            } catch (error) {   
                console.log(error)
                
            }
        }
        getSizes()
    },[])

    useEffect(() =>{
        async function getBelts(){
            try {
                const res = await ( 
                    await fetch("/api/v1/product/product/" + params.label_1)    // /:label/:id/:label_1
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

    console.log("sizes " + sizes)

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
                    <p>label {belt.label_1}</p> 
                    <p>prix {belt.price}</p>
                </div>
                <div className="details-color">
                    <div className="wrap">
                        <p>description {belt.description} </p>
                    </div>
                    <p>couleur {belt.color}</p>                    
                </div>

                <form action="">
                    <select name="size" id="size" onChange={(e) => setSizeChoice(e.target.value)}>
                        
                    <option value="rien" selected disabled > Selectionner la taille </option>
                    {!sizes ? (<></>) : (sizes.map((size) => (
                        <option
                            key={size.id}
                            value={size.size}
                        >
                            {size.size} - 
                             {size.colors}
                        </option>
                    )))}
                        
                    </select>
                   

                </form>
                
                 <button>Ajouter au panier ! </button> 
            </div> 
        </section>  

            
        </>
    )
}
export default Details
 */