import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import AddPic from "./AddPic";


function AdCreation(){

    

    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");    
    const [catSelect, setCatselect] = useState("");

    const [sizeSelect, setSizeSelect] = useState("");
    const [reference, setReference] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice]= useState("");
    const [quantity, setQuantity] = useState("");

    


    const [selectedSubTab, setSelectedSubTab] = useState("all");

    const handleSubTabClick = (subTab) =>{
        setSelectedSubTab(subTab)
    }
    
    const [categories, setCategories] = useState("");
    const [product_id, setProduct_id] = useState("");
    const [msg, setMsg] = useState(null)

    useEffect(()=>{
    
        async function getCategories(){
            try{  
                const categoryResult = await(
                    await fetch("/api/v1/product/categories")
                ).json()
                setCategories(categoryResult.datas)  
    
            }catch(error){
                console.log(error)
            }
    
        }
        getCategories();
    },[])

    async function handleSubmit(e){
        e.preventDefault();

        try{
        const res = await fetch("/api/v1/product/add", {
            method: "post",
            headers:  { "Content-Type": "application/json" },
            body: JSON.stringify({label,reference,price,description,catSelect,sizeSelect,color,quantity}),
            
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
    const handleCatChange = (e) => {
        setCatselect(e.target.value);
    }

    console.log("resultat catégories ==>" + categories)
    

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
                placeholder="Réference du produit "
                name="reference"
                value = {reference} onChange ={(e)=> setReference(e.target.value)}
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
                value= {price} onChange = {(e) =>setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                />
                
                <label for="cat_select">Choix de la catégorie</label>
                <select 
                name="cat_select" 
                id="cat_select"
                onChange={handleCatChange} >
                    
                    <option value="">choisissez une catégorie</option>
                    {!categories ? (<><p>Erreur chargement des catégories</p></>) :
                    (categories.map((categorie) => (
                        <option
                            key={categorie.id}
                            value={categorie.id}
                        >
                            {categorie.label}
                        </option>
                    )))}

                </select>

                <label For="size_select">Taille du produit</label>
                <input 
                name="size_select" 
                id="size_select"
                value = {sizeSelect} onChange = {(e) => setSizeSelect(e.target.value)}>                    
                </input>

                <label For="color">Couleur du produit</label>
                <input 
                type="text"                 
                name="color"
                value ={color} onChange = {(e) => setColor(e.target.value)}></input>

                <label For="quantity">Quantité a rentré en stock (Optionnel)</label>
                <input type="text"
                name="quantity"
                id="quantity"
                value={quantity} onChange= {(e) => setQuantity(e.target.value.replace(/[^0-9]/g, ''))} />
                
               

                

                <button type="submit" >Créer l'article</button> 

                {msg && <p className="msg_green">{msg}</p>}

                


            </form>
        </section>
        
         
    </> 
    )
}
export default AdCreation