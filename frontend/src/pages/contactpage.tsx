import BreadCrumb from "../components/common/breadcrumb";
import Footer from "../components/common/footer";
import NavBar from "../components/navbar";
import TopBar from "../components/common/topbar";
import Contact from "../components/contact";

const ContactPage = () => {
    return (
      <>
        <TopBar />
        <NavBar />
        <BreadCrumb />
        <Contact />
        <Footer />
      </>
    );
}
 
export default ContactPage;