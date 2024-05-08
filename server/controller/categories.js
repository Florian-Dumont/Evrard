import formidable from "formidable";
import Query from "../model/Query.js";


const getCategorieById = async (req, res) => {
    try {

        const query = "SELECT * FROM categories WHERE id = ?";
        const [datas] = await Query.findByDatas(query, req.params);
        res.status(200).json({datas})

    } catch (error) {
        throw Error(error)
    }

};
const updateCategorie = async (req, res) => {

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

        const imgInputFull = Object.keys(files).length;

        if (!imgInputFull) {
            const datas = {
                label : fields.label,
                description : fields.description,
                url_cat_image: fields.url_cat_image,
                id : fields.id,
            }        

            const query = "UPDATE categories SET label = ?, description = ?, url_cat_image = ? WHERE id = ?";
            const [result] = await Query.write(query, [datas.label, datas.description, datas.url_cat_image,  datas.id]);
            res.status(201).json({msg : "update réussi", result});

        } else {
            const datas = {
                label : fields.label,
                description : fields.description,
                url_cat_image: imgInputFull ? files.image[0].newFilename : "Placeholder.png",
                id : fields.id,
            }
        
            const query = "UPDATE categories SET label = ?, description = ?, url_cat_image = ? WHERE id = ?";
            const [result]  = await Query.write(query, [datas.label, datas.description, datas.url_cat_image,  datas.id]);
            res.status(201).json({msg : "update réussi", result});
        }

    } catch (error) {
        throw Error(error)
    }

};

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





export { getCategorieById, addCategories, updateCategorie, deleteCategories };