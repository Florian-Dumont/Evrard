import Query from "../../model/query.js";
import formidable from "formidable";

function home(req,res){
    res.status(200).render("admin/layout" , {subTemplate: null})
}
async function story(req,res){

    try{
        const query = "SELECT id, label, content, date,author FROM story"
        const [datas] = await Query.find(query) 
        res.status(200).render("admin/layout" , {subTemplate: "partials/story", datas})

    }catch (error){
        throw Error(error);
    }
}

async function addStory(req,res){

    try {
          //config de formidable ( traitement es formulaire pour fichier)
    const form = formidable({
        uploadDir:"public/img/story", // defini le dossier d'emplacement des images
        keepExtensions: true, // permet de conserver l'extention dans la DB
        allowEmptyFiles: false, // empeche les fichier vides
        multiples:true,
    });

    form.parse(req,async (err, fields, files) =>{        
        const story = {};
        for (const key in fields){
            story[key] = fields[key][0]; // story.label = fields.label[0] ([0] = valeur de l'input label) 1ere itération
                                         //story.content = fields.content[0] ([0] = valeur d l'input content) 2eme itération   
        }
        const query1 ="INSERT INTO story ( label, content, date, author) VALUES(?,?, NOW(),'admin')";
        const [result1] = await Query.write(query1, story)
        
        const img = {
            url: Object.keys(files).lenght ? files.url_img[0].newFilename : "no-picture.jpg",
            story_id: result1.insertId
        }

        const query2 =" INSERT INTO image( url, story_id ) VALUES (?,?)";
        await Query.write(query2,img)
        res.redirect("/admin/story");

    });
    } catch (error) {
        throw Error(error);
    }  

}

async function user(req,res){
    try {
        const query = " SELECT id, alias, email, creation_date FROM user"
        const [datas] = await Query.find(query) 
        res.status(200).render("admin/layout" , {subTemplate: "partials/user", datas})
        
    } catch  (error) {
        throw Error(error)
    }
}

async function deleteUser(req,res){
    console.log(req.params)
    const query = "DELETE FROM user WHERE id = ?";
    await Query.findByValue(query, req.params.id)
    res.json({msg : "utilisateur effacer"})
}

export {home, story, addStory, user, deleteUser};