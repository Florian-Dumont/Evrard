import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../../utils/BackButton";


function CategorieUpdate() {

    const params = useParams();

    const [id, setId] = useState("");
    // const [categorie, setCategorie] = useState("");
    const [label, setLabel] = useState("");
    const [description, setDescription] = useState("");
    const [catImage, setCatImage] = useState("");
    const [currentImageUrl, setCurrentImageUrl] = useState("");
    

    const [image, setImage] = useState(null); // gère l'input

    const [msg, setMsg] = useState("");

    useEffect(() => {

        async function getCategorie() {
            try {
                const categorie = await (
                    await fetch("/api/v1/categories/" + params.id)
                ).json()
                // setCategorie(categorie.datas);
                const firstCategorie = categorie.datas[0]
                setLabel(categorie.datas[0].label);
                setDescription(categorie.datas[0].description);
                setCatImage(categorie.datas[0].url_cat_image);
                setId(categorie.datas[0].id);
                setCurrentImageUrl(firstCategorie.url_cat_image)

                /* console.log(categorie) */
                // console.log(catImage)

            } catch (error) {
                throw Error(error)
            }
        }
        getCategorie();
    }, [currentImageUrl]);

    

    async function handleUpdate(e) {
        e.preventDefault();
        /*  const confirmed = window.confirm("Etes vous sur de vouloire modifier cette categorie ?."); */

        const formData = new FormData();

        formData.append('label', label);        
        formData.append('description', description);        
        formData.append('id', id);

        if (!image) {
            formData.append('url_cat_image', currentImageUrl);
        } else {
            formData.append('image', image);
        }

        try {
            const res = await fetch("/api/v1/categories/update/" + params.id, {
                method: "POST",
                body: formData,
            });
            const json = await res.json()
            
            setMsg(json.msg)
            if (res.status === 201) {
                // Mettre à jour l'URL de l'image après la mise à jour réussie
                // setCatImage(json.result.url_cat_image);
                setCurrentImageUrl(json.result.url_cat_image);
            }
            
        } catch (error) {
            console.error("Erreur lors de l'update :", error.message)
        }
    };
    


    return (
        <>
            <BackButton />
            <h2>MAJ d'une catégorie</h2>

            {msg && <p className="msg_green">{msg}</p>}

            <form onSubmit={handleUpdate}>
                <label htmlFor="label">Nom de la categorie</label>
                <input type="text" name="label" value={label} onChange={(e) => setLabel(e.target.value)} />

                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                <div className="edit-img">
                    <img src={"/img/" + catImage} alt="" />
                </div>

                <label htmlFor="picture">Changer l'image de la categorie</label>
                <input type="file" name="picture" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />


                <button>Valider</button>
            </form>


        </>
    )
};


export default CategorieUpdate;