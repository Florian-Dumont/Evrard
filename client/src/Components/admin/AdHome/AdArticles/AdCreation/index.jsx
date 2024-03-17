import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import AddPic from "./AddPic";


function AdCreation(){

    

    const [label, setLabel] = useState("")
    const[sublabel, setSublabel] = useState("")
    const [price, setPrice]= useState("")
    const[description, setDescription] = useState("")

    const [catSelect, setCatselect] = useState("")

    const [size_select, setSizeselect] = useState("")
    const [color, setColor] = useState("")


    const [selectedSubTab, setSelectedSubTab] = useState("all");

    const handleSubTabClick = (subTab) =>{
        setSelectedSubTab(subTab)
    }
    

    const [product_id, setProduct_id] = useState("");
    const [msg, setMsg] = useState(null)

    async function handleSubmit(e){
        e.preventDefault();

        try{
        const res = await fetch("/api/v1/product/add", {
            method: "post",
            headers:  { "Content-Type": "application/json" },
            body: JSON.stringify({label,sublabel,price,description,catSelect,size_select,color}),
            
        })
        if (res.status === 201) {
            const json = await res.json();
            
            setProduct_id(json.productId);
            setMsg(json.msg);
            
          } else {
           
          }
        } catch (error) {
            
          console.error("Erreur lors de l'envoi de la requête :", error);
        }

    }
    

    return(
    <>   
        <h2>Création d'article</h2>

        <section>
            <form className="form-add" onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Nom du produit"
                name="label"
                value = {label} onChange ={(e) => setLabel(e.target.value)}
                />

                <input type="text"
                placeholder="Sous-titre du produit (optionnel) "
                name="sublabel"
                value = {sublabel} onChange ={(e)=> setSublabel(e.target.value)}
                />

                <textarea
                placeholder ="Description du produit"
                name="description"
                id="description"
                cols="50"
                rows="5"
                    value ={description} onChange ={(e)=> setDescription(e.target.value)}
                >                    
                </textarea>

                <input 
                type="number"
                placeholder="Prix du produit" 
                name="price"
                value= {price} onChange = {(e) =>setPrice(e.target.value)}
                />

                <label for="cat_select">Choix de la catégorie</label>
                <select 
                name="cat_select" 
                id="cat_select"
                value ={catSelect} onChange ={(e) => setCatselect(e.target.value)}
                >
                    <option value="">choisissez une catégorie</option>
                    <option value="1">1-Ceinture</option>
                    <option value="2">2-Porte-feuille</option>
                    <option value="3">3-Porte-carte</option>
                    <option value="4">4-Sacoche-en-cuir</option>

                </select>

                <label For="size_select">Taille du produit</label>
                <input 
                name="size_select" 
                id="size_select"
                value = {size_select} onChange = {(e) => setSizeselect(e.target.value)}>
                    
                </input>

                <label For="color">Couleur du produit</label>
                <input 
                type="text"                 
                name="color"
                value ={color} onChange = {(e) => setColor(e.target.value)}               />

                

                <button type="submit" >Créer l'article</button> 

                {msg && <p className="msg_green">{msg}</p>}

                


            </form>
        </section>
        
         
    </> 
    )
}
export default AdCreation