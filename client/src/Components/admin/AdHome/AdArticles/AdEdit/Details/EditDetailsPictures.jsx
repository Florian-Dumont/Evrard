import { useState, useEffect } from "react";

function EditDetailsPictures({ detailId }) {
    const [image, setImage] = useState(null);
    const [detail_id, setDetail_id] = useState(detailId);
    const [msg, setMsg] = useState("");

    const [allimages, setAllimages] = useState(null);

    useEffect(() => {
        async function getAllProduct() {
            try {
                const images = await fetch("/api/v1/details/product/images/" + detailId);
                const json = await images.json();
                setAllimages(json);
            } catch (error) {
                console.log(error);
            }
        }
        getAllProduct();
    }, [allimages]);

    /*     useEffect(() => {
            setTimeout(() => {
                // Mettre à jour detailId après 1000 millisecondes (1 seconde)
                setDetail_id(detailId);
            }, 1000);
        }, [detailId]); */

    async function handleUpload(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', image);
        const detailId = detail_id;
        formData.append('detailId', detailId);

        try {
            const res = await fetch("http://localhost:9000/api/v1/details/addPic", {
                method: 'POST',
                body: formData,
            });
            const json = await res.json();
            setMsg(json.msg);
        } catch (error) {
            console.error('Erreur lors de l\'upload :', error.message);
        }
    }

    return (
        <>
            <h2 className="form-title-edit">Images du produit</h2>

            <div className="edit-img">
                {!allimages ? (
                    <>
                        <p>Il n'y a pas d'images</p>
                    </>
                ) : (allimages.map(allimage =>
                    <>
                        <img  src={"/img/" + allimage.url_image} alt="image du produit" />

                    </>
                ))}
            </div>
            <section>
                <h3 className="form-title-edit">Ajouter une image au produit</h3>

                <form className="form-container" onSubmit={handleUpload}>

                    <label htmlFor="picture">Télécharger l'image *</label>
                    <input required type="file" name="picture" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />


                    <input className="input"
                        placeholder="ID du détails"
                        type="text" 
                        name="detail_id"
                        value={detail_id}
                        onChange={(e) => setDetail_id(e.target.value)}
                        hidden
                    />


                    <button type="submit">Télécharger</button>
                    {msg && <p className="msg_green">{msg}</p>}
                </form>
            </section>
        </>
    );
}

export default EditDetailsPictures;
