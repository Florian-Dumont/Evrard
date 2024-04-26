import formidable from "formidable";
import Query from "../model/Query.js";


const addCategories = async (req, res) => {
    const form = formidable({
        uploadDir: "public/img",
        keepExtensions: true,
        allowEmptyFiles: false,
    });

    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (error, fields, files) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ fields, files });
                }
            });
        });

        console.log('addCategories ----------- files', files);
        console.log('addCategories ++++++++++++++++ fields', fields);

        const img = {
            label: fields.label,
            description: fields.description,
            url_cat_image: Object.keys(files).length ? files.image[0].newFilename : "noImg.png",
        }

        const query = "INSERT INTO categories (label,description,url_cat_image ) VALUES (?,?,?)";
        await Query.write(query, [img.label, img.description, img.url_cat_image]);

        res.status(201).json({ msg: "La catégorie a bien été crée et l'image uploadé" });
    } catch (error) {
        console.error("Erreur lors de l'upload :", error.message);
        res.status(500).json({ error: "Erreur lors de l'upload de l'image." });
    }
};
const deleteCategories = async (req,res) => {

    const data = {
        id : req.body.id,
    }
    console.log('deleteCategories ++++++++++++++++ req.body.id', req.body.id);
    console.log('deleteCategories ++++++++++++++++ id', data.id);

    try {

        const query = "DELETE FROM categories WHERE id = ?";
        await Query.deleteByValue(query, data)

        res.status(201).json({});

    } catch (error) {
        throw Error(error)
    }
}





export { addCategories,deleteCategories };