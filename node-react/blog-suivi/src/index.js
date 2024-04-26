import express from "express";
import "dotenv/config";
import session from "express-session";
import router from "./router/index.route.js";



import poll from "./config/db.js";





const PORT = process.env.PORT || process.env.LOCAL_PORT


const app = express();


// configurer le server
// config du moteur de rendu
app.set("views", "./src/views").set("view engine", "ejs");
//les middleware

app.use(express.static("public"))
    .use(express.urlencoded({extended : true})) // formulaire
    .use(express.json()) // donnée Json
    .use(session({
        secret :process.env.SK,
        resave : false,
        saveUninitialized :false,
    }))
    .use((req,res,next) =>{
        if(!req.session.user){
            req.session.user = {isLogged: false, alias: null}
        }
        next()     
    })

    
    //router
    .use(router)




app.listen(PORT, () => console.log("running on http://localhost:" + PORT + "/admin"))