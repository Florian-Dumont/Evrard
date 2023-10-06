import { hash } from "bcrypt";
import Query from "../model/Query.js";
import jsonwebtoken from "jsonwebtoken";

const {SK} = process.env;
const SALT = 10;
const { sign } = jsonwebtoken;


const check_token = async (req,res) => {
    try {
        const query = "SELECT name FROM user WHERE name = ?"
        await Query.findByValue(query, req.params.label);
        res.status(200).json({msg : "Utilisateur verifier"})

    } catch (error) {
        throw Error(error)
    }
}

const signin = async (req,res) => {
    try {
        let msg = "";
        const datas = {name : req.body.name, email: req.body.email}; 
        const query = "SELECT * FROM user WHERE name= ? AND email = ?"
        const [user] = await Query.findByDatas(query, datas);

        if(user.length){ // verif si les info sont présente en bdd
            msg = "Utilisateur ok"
            const TOKEN = sign({label:user[0].name},SK);
            res.status(200).json({msg, TOKEN});    
        }else if(!user.length){ // si pas présente
            msg = "Erreur identifiant ou mot de passe";
            res.status(409).json({msg})
        }

    } catch (error) {
        throw Error(error)
    }
}

const createAccount = async ( req,res) => {
    try {
        let msg = "";
        const datas = {email: req.body.email}; // champ du formulaire a venir
        const query = "SELECT name, email FROM user WHERE email = ?"
        const [user] = await Query.findByDatas(query, datas);

        if(!user.length){ // si l'utilisateur n'existe pas
            const datas = {
                name: req.body.name,
                email: req.body.email,
                password: await hash(req.body.password, SALT),
                //ajouter d'autre verif
            }

            const query = "INSERT INTO user (name, email, password, role, created_at) VALUES(?,?,?,0, NOW() ) ";
            await Query.write(query, datas)

        }else if (user.length){ // si l'utilisateur existe deja
            msg = "Email deja existant"
            res.status(409).json({msg})
        }


    } catch (error) {
        throw Error (error)
    }
}


export {check_token,signin,createAccount}