import Header from "./Components/pages/Header/Header";
import Footer from "./Components/pages/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home/index";
import Boutique from "./Components/pages/Boutique/index";
import About from "./Components/pages/Histoire";
import Manufacturing from "./Components/pages/Fabrication";
import ProductByCategories from "./Components/pages/Product";
import Details from "./Components/pages/Details";




function App() {
  return (
    <>
      <Header/>
        <Routes>
          <Route path ="/" element = {<Home/>}/>
          <Route path = "/boutique" element= {<Boutique/>} />
          <Route path = "/boutique/:label/:id" element= {<ProductByCategories/>} />
          <Route path = "/Histoire" element = {<About/>}/>
          <Route path = "/Fabrication" element = {<Manufacturing/>}/>
          <Route path = "boutique/:label/:id/:label_1" element = {<Details/>}/>
        </Routes>
      <Footer/>
    </>
  );
}

export default App;
