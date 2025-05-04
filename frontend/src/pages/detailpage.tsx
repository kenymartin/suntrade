import BreadCrumb from "../components/common/breadcrumb";
import ShopDetails from "../components/details";
import Footer from "../components/common/footer";
import NavBar from "../components/navbar";
import Products from "../components/products";
import TopBar from "../components/common/topbar";

const DetailPage = () => {
    return (<>
        <TopBar />
        <NavBar />
        <BreadCrumb />
        <ShopDetails/>
        <Products/>
        <Footer />
    </>);
}
 
export default DetailPage;