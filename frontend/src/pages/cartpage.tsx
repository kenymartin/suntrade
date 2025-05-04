import BreadCrumb from "../components/common/breadcrumb";
import Cart from "../components/cart";
import Footer from "../components/common/footer";
import NavBar from "../components/navbar";
import TopBar from "../components/common/topbar";

const CartPage = () => {
  return (
    <>
      <TopBar />
      <NavBar />
      <BreadCrumb />
      <Cart />
      <Footer />
    </>
  );
};

export default CartPage;
