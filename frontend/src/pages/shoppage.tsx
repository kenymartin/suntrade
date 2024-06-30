import BreadCrumb from "../components/common/breadcrumb";
import Footer from "../components/common/footer";
import NavBar from "../components/navbar";
import Shop from "../components/shop";
import TopBar from "../components/common/topbar";

const ShopPage = () => {
    return (<>
        <TopBar />
        <NavBar />
        <BreadCrumb />
        <Shop />
        <Footer />
    </>);
}
 
export default ShopPage;