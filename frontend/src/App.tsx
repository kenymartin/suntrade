import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homepage";
import CartPage from "./pages/cartpage";
import ContactPage from "./pages/contactpage";
import DetailPage from "./pages/detailpage";
import ShopPage from "./pages/shoppage";
import CheckoutPage from "./pages/checkoutpage";
import LoginPage from "./pages/loginpage";
import ProfilePage from "./pages/profilepage";
import SignupPage from "./pages/signuppage";
import { ToastContainer } from "react-toastify";
import ConfirmRegistrationPage from "./pages/confirm-registrationpage";
import "react-toastify/dist/ReactToastify.css";
import LinkSentPage from "./pages/linksentpage";
import ForgotPasswordLinkPage from "./pages/forgotpasswordlinkpage";
import ChangePassword from "./components/changepassword";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/confirm-registration"
            element={<ConfirmRegistrationPage />}
          />
          <Route path="/linksent" element={<LinkSentPage />} />
          <Route path="/forgotpasswordlink" element={<ForgotPasswordLinkPage />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
