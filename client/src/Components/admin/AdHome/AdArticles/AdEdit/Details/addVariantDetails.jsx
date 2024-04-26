import React, { useState, useEffect } from "react";
import { useParams, } from "react-router-dom";

function AddVarianteDetails() {

    const params = useParams();

    const [showForm, setShowForm] = useState(false);

    const [size, setSize] = useState("");
    const [reference, setReference] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleButtonClick = () => {
        setShowForm(!showForm)
    }

    async function handleSubmitVariantDetails(e) {
        e.preventDefault();

        const res = await fetch("/api/v1/details/addVariante", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ size, reference, color, price, product_id: params.id, quantity }),
        });
        const json = await res.json();

        console.log("JSON " + json)
        console.log("message " + json.msg);


    }

    return (
        <>
            <button onClick={handleButtonClick}>Crée une variante de produit</button>

            {showForm && (

                <form className="form-container" onSubmit={handleSubmitVariantDetails}>
                    <label>
                        Taille :
                        <input className="input" type="text" name="size" value={size} onChange={(e) => setSize(e.target.value)} required />
                    </label>
                    <label>
                        Reference :
                        <input className="input" type="text" name="reference" value={reference} onChange={(e) => setReference(e.target.value)} required />
                    </label>
                    <label>
                        Couleur :
                        <input className="input" type="text" name="color" value={color} onChange={(e) => setColor(e.target.value)} required />
                    </label>
                    <label>
                        Prix :
                        <input className="input" type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </label>
                    <label>
                        Quantity :
                        <input className="input" type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    </label>
                    <button type="submit">Envoyer</button>
                </form>

            )}

        </>
    )
}







export default AddVarianteDetails;