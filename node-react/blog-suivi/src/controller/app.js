import Query from "../model/query.js";
import { user } from "./admin/index.js";
import bcrypt, { hash } from "bcrypt";
//const bcrypt  = require("bcrypt");



// page de vue de l'app 
// la page home
async function home(req,res){

    const query = "SELECT label, content, date, author FROM story";
    const [datas] = await Query.find(query);


    res.status(200).render("layout",{template: "home", datas});
}

// page de connexion
async function signup(req,res){  


    res.status(200).render("layout",{template: "signin"});
}
async function login(req,res){
    try {
        const query1 ="SELECT alias,email,password FROM user WHERE alias = ?";
        const [user] = await Query.findByValue(query1, req.body.alias);
   console.log(user) 
   
        if(user.length){
            console.log("utilisateur existant");
        }
        if(!user.length){
            console.log("utilisateur inéxistant")
            const hash = await bcrypt.hash(req.body.password, 10)
            console.log(hash)
            const user = {
                        alias : req.body.alias,
                        email: req.body.email,
                        password : hash,                        
                    }
            const query = "INSERT INTO user (alias, email, password, creation_date) VALUES (?,?,?, NOW() )"
            const result =  await Query.write(query, user)
            console.log(result);
            res.redirect("/")
        }
        
    //     console.log(user)
        
    //     //console.log(query)
    
    // console.log(result)
        
        } catch (error) {
            throw Error (error)
            
        }
    
}

//page de connexion utilisateur
export {home, signup, login};