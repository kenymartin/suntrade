import Carousel  from "../components/carousel";
// import Category from "../components/category";
import Feautured from "../components/featured";
import Footer from "../components/common/footer";
import NavBar from "../components/navbar";
import Offer from "../components/offer";
import Products from "../components/products";
import TopBar from "../components/common/topbar";
import Vendor from "../components/vendor";

const HomePage = () => {
    return (
      <>
        <TopBar />
        <NavBar />
        <Carousel />
        <Feautured />
        <Products />
        <Offer />
        <Products />
        <Vendor />
        <Footer />
      </>
    );
}
 
export default HomePage;