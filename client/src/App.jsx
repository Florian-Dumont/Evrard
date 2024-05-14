import Header from "./Components/pages/Header/Header";
import Footer from "./Components/pages/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home/index";
import Cart from "./Components/pages/Cart/index";
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
import AdminLog from "./Components/admin/AdminLog.jsx"
import AddPic from "./Components/admin/AdHome/AdArticles/AdCreation/AddPic.jsx";
import AdEdit from "./Components/admin/AdHome/AdArticles/AdEdit/index.jsx";
import AdEditProduct from "./Components/admin/AdHome/AdArticles/AdEdit/AdEditProduct.jsx";
/* import EditSize from "./Components/admin/AdHome/AdArticles/AdEdit/Size/EditSize.jsx";
 */import EditDetails from "./Components/admin/AdHome/AdArticles/AdEdit/Details/EditDetails.jsx";
import CategorieUpdate from "./Components/admin/AdHome/AdArticles/AdCategories/categorieUpdate.jsx";


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<HOC child={Home} />} />
        <Route path="/panier" element={<HOC child={Cart} />} />
        <Route path="/boutique" element={<HOC child={Boutique} />} />
        <Route path="/boutique/:label/:id" element={<HOC child={ProductByCategories} />} />
        <Route path="/Histoire" element={<HOC child={About} />} />
        <Route path="/Fabrication" element={<HOC child={Manufacturing} />} />
        <Route path="boutique/:label/:id/:label_1" element={<HOC child={Details} />} />

        <Route path="utilisateur">
          <Route path="connexion" element={<HOC child={Signin} />} />
          <Route path="creer-un-compte" element={<HOC child={Signup} />} />
          <Route path="deconnexion" element={<HOC child={Signout} />} />
        </Route>

        <Route path="admin" element={<AdminLog />} />
        <Route path="admin/true" element={<AdHome />}>

          <Route path="ajouter-une-image" element={<AddPic />} />
          <Route path="articles" element={<AdArticles />} />
          <Route path="commandes" element={<AdCommandes />} />
          <Route path="inventaire" element={<AdInventaire />} />
          <Route path="stats" element={<AdStats />} />
        </Route>
        <Route path="admin/true/update" element={<AdEdit />} />
        <Route path="admin/true/update/:id" element={<AdEditProduct />} />
        {/*         <Route path="admin/true/update/size/:id" element={<EditSize />} />
 */}        <Route path="admin/true/update/details/:id" element={<EditDetails />} />
        <Route path ="admin/true/update/categorie/:id" element ={<CategorieUpdate/>}></Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
