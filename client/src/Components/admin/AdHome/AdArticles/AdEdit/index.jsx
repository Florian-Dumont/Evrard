import React, {useState,useEffect} from "react";

function AdEdit(){

    const [label, setLabel] = useState("")
    const[sublabel, setSublabel] = useState("")
    const [price, setPrice]= useState("")
    const[description, setDescription] = useState("")
    const [catSelect, setCatselect] = useState("")
    const [size_select, setSizeselect] = useState("")
    const [color, setColor] =useState("")
    const [url_image, setUrlimage] = useState("")
    const [url_image_2, setUrlimage2] = useState("")
    const [url_image_3, setUrlimage3] = useState("")
    const [url_image_4, setUrlimage4] = useState("")

    const[allProduct, setAllProduct] = useState("")

        useEffect(()=>{
            async function getAllProduct(){
                try {
                    const productResult = await(
                        await fetch("/api/v1/product/allproduct")
                    ).json()
                    setAllProduct(productResult.datas)
                    
                } catch (error) {
                    console.log(error)
                    
                }

            }
            getAllProduct();

        },[])

    
    return(
    <>
        <h1>Edition de produit</h1>

        <section>
            <form action="">

                <label htmlFor="select_prod">Choix du produit a modifier</label>
                <select 
                name="select_prod" 
                id="select_prod"
                >
                    {!allProduct ? (<option>Loading ...</option>) : (allProduct.map((product)=>(
                        <option value={product.id}>{product.label_1}</option>
                    )))
                    }
                </select>
            </form>
        </section>

        <section>
            <form action="">
                <input type="text"
                placeholder="Nom du produit"
                name="label_1"
                value = {label} onChange ={(e) => setLabel(e.target.value)}
                />

                <input type="text"
                placeholder="Sous-titre du produit (optionnel)"
                name="label_2"
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

                <label htmlFor="cat_select">Choix de la catégorie</label>
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

                <label htmlFor="size_select">Choix de la taille</label>
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

                <label htmlFor="url_image">Photo principale du produit</label>
                <input 
                type="file"
                name="url_image"
                accept="image/png, image/jpeg, image/webp, image/jpg"
                value={url_image} onChange ={(e)=> setUrlimage(e.target.value)}
                 />

                 <label htmlFor="url_image_2">Photo supplémentaire(optionnel)</label>
                 <input 
                 type="file" 
                 name="url_image_2"
                 accept="image/png, image/jpeg, image/webp, image/jpg"
                 value={url_image_2} onChange ={(e)=> setUrlimage2(e.target.value)}
                 />

                <label htmlFor="url_image_3">Photo supplémentaire(optionnel)</label>
                 <input 
                 type="file" 
                 name="url_image_3"
                 accept="image/png, image/jpeg, image/webp, image/jpg"
                 value={url_image_3} onChange ={(e)=> setUrlimage3(e.target.value)}
                 />

                <label htmlFor="url_image_4">Photo supplémentaire(optionnel)</label>
                <input 
                 type="file" 
                 name="url_image_4"
                 accept="image/png, image/jpeg, image/webp, image/jpg"
                 value={url_image_4} onChange ={(e)=> setUrlimage4(e.target.value)}
                />

                <button type="submit">Modifier l'article</button>




            </form>
        </section>
    </>
    )
}
export default AdEdit