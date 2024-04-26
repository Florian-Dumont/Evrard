import express from "express";
import "dotenv/config";
import session from "express-session";

import router from "./router/index.routes.js";

const app = express();
const PORT = process.env.PORT || process.env.LOCAL_PORT;

app.set("views", "./src/views").set("view engine", "ejs");

app.use(express.static("public"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(
        session({
            secret: process.env.SK,
            resave: false,
            saveUninitialized: false,
        })
    )
    .use((req, res, next) => {
        if (!req.session.user) {
            req.session.user = { isLogged: false, alias: null };
        }
        next();
    })
    .use(router);

app.listen(PORT, () => console.log("Running on http://localhost:" + PORT + "/admin"));
