import Header from "./Components/pages/Header/Header";
import Footer from "./Components/pages/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home/index";
import Boutique from "./Components/pages/Boutique/index";
import About from "./Components/pages/Histoire";
import Manufacturing from "./Components/pages/Fabrication";
import ProductByCategories from "./Components/pages/Product";
import Details from "./Components/pages/Details";
import Signin from "./Components/pages/user/Signin";
import Signup from "./Components/pages/user/Signup";
import Signout from "./Components/pages/user/Signout";
import HOC from "./Components/HOC";
import AdHome from "./Components/admin/AdHome";
import AdArticles from "./Components/admin/AdHome/AdArticles"
import AdCommandes from "./Components/admin/AdHome/AdCommandes";
import AdInventaire from "./Components/admin/AdHome/AdInventaire";
import AdStats from "./Components/admin/AdHome/AdStats"



function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path ="/" element = {<HOC child = {Home}/>}/>
          <Route path = "/boutique" element= {<HOC child = {Boutique}/>} />
          <Route path = "/boutique/:label/:id" element= {<HOC child = {ProductByCategories}/>} />
          <Route path = "/Histoire" element = {<HOC child = {About}/>}/>
          <Route path = "/Fabrication" element = {<HOC child = {Manufacturing}/>}/>
          <Route path = "boutique/:label/:id/:label_1" element = {<HOC child = {Details}/>}/>

          <Route path ="utilisateur">
            <Route path="connexion" element = {<Signin/>} />
            <Route path="creer-un-compte" element= {<Signup/>} />
            <Route path = "deconnexion" element ={<HOC child = {Signout}/>} />
          </Route>

          <Route path ="admin" element = {<AdHome/>}>
            <Route path = "articles" element = {<AdArticles/>} />
            <Route path = "commandes" element = {<AdCommandes/>} />
            <Route path = "inventaire" element ={<AdInventaire/>} />
            <Route path ="stats" element = {<AdStats/>} />
          </Route>

        </Routes>
      <Footer/>
    </>
  );
}

export default App;
