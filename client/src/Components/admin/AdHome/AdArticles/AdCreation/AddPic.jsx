import { useState, useEffect } from "react";

function AddPic (/* { productId } */) {
    const [image, setImage] = useState(null);
    const [allProduct, setAllProduct] = useState("");
    const [product_id, setProduct_id] = useState("");
    const [msg, setMsg] = useState("");
    

    useEffect(() => {
        async function getAllProduct() {
            try {
                const productResult = await fetch("/api/v1/product/allproduct");
                const productData = await productResult.json();
                setAllProduct(productData.datas);
            } catch (error) {
                console.log(error);
            }
        }
        getAllProduct();
    }, [/* product_id */]);

/*     useEffect(() => {
        setTimeout(() => {
            // Mettre à jour product_id après 1000 millisecondes (1 seconde)
            setProduct_id(productId);
        }, 1000);
    }, [productId]); */

    const handleProductIdChange = (e) => {
        setProduct_id(e.target.value);
        console.log(product_id)
    }

    async function handleUpload(e) {
        e.preventDefault();
        
        console.log("handleUpload", product_id)
        const formData = new FormData();
        formData.append('image', image);
        const productId = product_id;
        formData.append('productId', productId);

        try {
            const res = await fetch("http://localhost:9000/api/v1/product/addPic", {
                method: 'POST',
                body: formData,
            });
            const json = await res.json();
            setMsg(json.msg);
        } catch (error) {
            console.error('Erreur lors de l\'upload :',  error.message );
        }
    };

    return (
        <>
            <h1>Formulaire image</h1>
            <section>
                <h3 className="form_title read">Ajouter une image au produit</h3>
                

                
                <form onSubmit={handleUpload}>

                    <label htmlFor="picture">Télécharger l'image *</label>
                    <input required type="file" name="picture" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

                    <select name="select_prod" id="select_prod" onChange={handleProductIdChange} >

                    <option value="" selected disabled > Selectionner le produit </option>
                    {!allProduct ? (
                        <option>Loading ...</option>
                    ) : (
                        allProduct.map((product) => (
                            <option key={product.id} value={product.product_id}>
                                {product.label_1} - ID : {product.product_id}
                            </option>
                        ))
                    )}
                </select>

                    {/* <input
                        placeholder="ID du produit"
                        type="text"
                        name="product_id"
                        value={product_id}
                        onChange={(e) => setProduct_id(e.target.value)}
                    /> */}

                    
                    <button type="submit">Télécharger</button>
                    {msg && <p className="msg_green">{msg}</p>}
                </form>
            </section>
        </>
    );
}

export default AddPic;
