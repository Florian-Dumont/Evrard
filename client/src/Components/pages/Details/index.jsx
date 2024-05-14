import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { addToCart } from "../../../store/slices/cart";
import { userSlice } from "../../../store/slices/user";

function Details() {

    const [products, setProducts] = useState(null);

    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizeChoice, setSizeChoice] = useState("");
    const [colorChoice, setColorChoice] = useState("");

    const [quantityChoice, setQuantityChoice] = useState("");

    const [msg, setMsg] = useState(null);
    const [msg2, setMsg2] = useState(null);

    const { cartInfo } = useSelector((state) => state.cart);  // reducer du panier
    const { infos } = useSelector((state) => state.user);  // reducer du panier

    console.log("infos", infos);

    const params = useParams();
    const dispatch = useDispatch();

    const myuserid = localStorage.getItem("myuserid");

    useEffect(() => {
        async function getSizes() {
            try {
                
                const sizes = await fetch("/api/v1/product/sizes/" + params.label_1);
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
        async function getColors() {
            try {
                if (!sizeChoice) {
                    // Si aucune taille sélectionnée, on vide les couleurs
                    setColors([]);
                    return;
                }
                const colorsResponse = await fetch(`/api/v1/product/colors/` + params.label_1 + "/" + sizeChoice);
                if (colorsResponse.ok) {
                    const colorsData = await colorsResponse.json();
                    setColors(colorsData);
                    console.log("colors", colorsData)
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
    useEffect(() => {
        async function getProduct() {
            try {
                const res = await (
                    await fetch("/api/v1/product/product/" + params.label_1)    // /:label/:id/:label_1
                ).json();
                setProducts(res.datas)

                  

            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
          
    }, [])

    if (!products) {
        return <p>Loading...</p>;
    }
    
    const product = products[0];

     console.log("sizes " + product); 

    function handleAddToCart(e) {
        e.preventDefault();

        const indexProduct = cartInfo.product.findIndex(
            (product_cart) => product_cart.ref === product.reference && product_cart.size === sizeChoice
        );

        let validSizeSelected = true; // empêche l'utilisateur de valider le formulaire sans avoir sélectionner une taille
        let validColorSelected = true;
        let validQuantitySelected = true;

        if (!sizeChoice) {   // niveau 1 ---------------------

            setMsg("Sélectionnez une taille !")
            validSizeSelected = false;

        } else { // niveau 1 ---------------------

            if (colorChoice === "") { // niveau 2 +++++++++++++++++++++++++++++++
                setMsg("Sélectionnez une couleur !")
                validColorSelected = false;
            } else {


                if (quantityChoice === "") {
                    setMsg("Sélectionnez une quantité !")
                    validQuantitySelected = false;
                }

            } // niveau 2 +++++++++++++++++++++++++++++++
        } // niveau 1 ---------------------



        if (validQuantitySelected && validSizeSelected && validColorSelected) {

            // la fonction n'est active que si une taille a été choisie dans le <select>
            if (indexProduct === -1) {
                const newCart = {
                    product: [
                        ...cartInfo.product,
                        {
                            ref: product.reference,
                            product_id: product.product_id,
                            quantity: parseInt(quantityChoice,10),
                            size: sizeChoice,
                            color: colorChoice,
                            priceEach: parseFloat(product.price)
                        },
                    ],
                    buyer: myuserid,  // userID à modifier
                };
                localStorage.setItem("cart", JSON.stringify(newCart));
                dispatch(addToCart(newCart));
            } else {
                const newCart = {
                    product: [
                        ...cartInfo.product,
                    ],
                    buyer: myuserid, // userID à modifier
                };
                newCart.product[indexProduct] = {
                    ...newCart.product[indexProduct],
                    quantity: cartInfo.product[indexProduct].quantity + parseInt(quantityChoice, 10),
                };
                localStorage.setItem("cart", JSON.stringify(newCart));
                dispatch(addToCart(newCart));
            }

            setMsg("")
            setMsg2("Votre article a été ajouté au panier");
            setTimeout(() => {
                setMsg2("")
            }, 5000)
        }
    };


    return (
        <>
            <div>
                <p className="detail-product-name"> {product.label_1}</p>
            </div>

            <section className="details-card">

                <div className="details-imgs">
                    <img src={"/img/" + product.url_image} alt="" />
                    <div className="details-childimg">
                        <img src={"/img/Placeholder.png"} alt="" />
                        <img src={"/img/Placeholder.png"} alt="" />
                        <img src={"/img/Placeholder.png"} alt="" />
                    </div>
                </div>
                <div className="details-contener">
                    <div className="details-descr">
                        <div className="details-name">


                        </div>
                        <div className="details-color">
                            <div className="wrap">
                                <p> {product.description} </p>
                            </div>

                        </div>
                    </div>
                    <div>

                    </div>

                    <form onSubmit={handleAddToCart}>
                        <select className="details-select" name="size" id="size" onChange={handleSizeChange}>

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

                        <select className="details-select" name="colors" id="colors" onChange={handleColorChange} value={colorChoice}>

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

                        <select className="details-select" name="quantity" id="quantity" onChange={(e) => setQuantityChoice(e.target.value)}>

                            <option value="" selected disabled > Selectionner la quantité </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>

                        <p>{product.price} €</p>

                        {msg && <p >{msg}</p>}
                        {msg2 && <p >{msg2}</p>}
                        <button type="submit">Ajouter au panier ! </button>
                    </form>
                </div>
            </section>

        </>
    );
};

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