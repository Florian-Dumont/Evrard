import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function AdCreation(){

    const navigate= useNavigate()

    const [label, setLabel] = useState("")
    const[sublabel, setSublabel] = useState("")
    const [price, setPrice]= useState("")
    const[description, setDescription] = useState("")

    const [catSelect, setCatselect] = useState("")

    const [size_select, setSizeselect] = useState("")
    const [color, setColor] = useState("")
    const [url_image, setUrlimage] = useState("")
    const [url_image_2, setUrlimage2] = useState("")
    const [url_image_3, setUrlimage3] = useState("")
    const [url_image_4, setUrlimage4] = useState("")

    const [msg, setMsg] = useState(null)

    async function handleSubmit(e){
        e.preventDefault();
        

        try{
        const res = await fetch("/api/v1/product/add", {
            method: "post",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({label,sublabel,price,description,catSelect,size_select,color,url_image,url_image_2,url_image_3,url_image_4}),
            
        })
        if (res.status === 200) {
            const json = await res.json();
            
            setMsg(json.msg);
            navigate("/");
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

                <label For="size_select">Choix de la taille</label>
                <select 
                name="size_select" 
                id="size_select"
                value = {size_select} onChange = {(e) => setSizeselect(e.target.value)}
                >
                    <option value="">choisissez une taille</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                </select>

                <input 
                type="text" 
                placeholder="Couleur du produit"
                name="color"
                value ={color} onChange = {(e) => setColor(e.target.value)}
                />

                <label For="url_image">Photo principale du produit</label>
                <input 
                type="file"
                name="url_image"
                accept="image/png, image/jpeg, image/webp, image/jpg"
                value={url_image} onChange ={(e)=> setUrlimage(e.target.value)}
                 />

                 <label For="url_image_2">Photo supplémentaire(optionnel)</label>
                 <input 
                 type="file" 
                 name="url_image_2"
                 accept="image/png, image/jpeg, image/webp, image/jpg"
                 value={url_image_2} onChange ={(e)=> setUrlimage2(e.target.value)}
                 />

                <label For="url_image_3">Photo supplémentaire(optionnel)</label>
                 <input 
                 type="file" 
                 name="url_image_3"
                 accept="image/png, image/jpeg, image/webp, image/jpg"
                 value={url_image_3} onChange ={(e)=> setUrlimage3(e.target.value)}
                 />

                <label For="url_image_3">Photo supplémentaire(optionnel)</label>
                <input 
                 type="file" 
                 name="url_image_4"
                 accept="image/png, image/jpeg, image/webp, image/jpg"
                 value={url_image_4} onChange ={(e)=> setUrlimage4(e.target.value)}
                />

                <button type="submit">Crée l'article</button> 




            </form>
        </section>
        
         
    </> 
    )
}
export default AdCreation