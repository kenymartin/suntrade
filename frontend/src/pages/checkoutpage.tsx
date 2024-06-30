import BreadCrumb from "../components/common/breadcrumb";
import Checkout from "../components/checkout";
import Footer from "../components/common/footer";
import NavBar from "../components/navbar";
import TopBar from "../components/common/topbar";

const CheckOutPage = () => {
    return (
      <>
        <TopBar />
        <NavBar />
        <BreadCrumb />
        <Checkout />
        <Footer />
      </>
    );
}
 
export default CheckOutPage;