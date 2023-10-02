import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./router/index.routes.js"; 

const app = express();

// permets la communication sans restriction entre 2 points d'origine différente ici le PORT entre notre node et react
    app.use(express.static("public"))
    .use(cors())        
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(router)


app.get("/api/v1/product/all", (req, res) => {

   

});

app.listen(9000, () => console.log("running on http://localhost:9000"));