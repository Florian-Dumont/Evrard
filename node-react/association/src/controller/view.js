import Query from "../model/query.js";

async function home(req, res) {

    try {
        const query = "SELECT * FROM story";
        const [data] = await Query.find(query);
        res.status(200).json({ msg: "connected to home", data });
    } catch (error) {
        throw Error(error)
    }

}

function story(req, res) {
    res.json({ msg: "connected to story" });
}

function signin(req, res) {
    res.json({ msg: "connected to signin" });
}

function signup(req, res) {
    res.json({ msg: "connected to signup" });
}

function dashboard(req, res) {
    res.json({ msg: "connected to dashboard" });
}


export { home, story, signin, signup, dashboard };