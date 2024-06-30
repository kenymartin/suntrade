import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage";
import CartPage from "./pages/cartpage";
import ContactPage from "./pages/contactpage";
import DetailPage from "./pages/detailpage";
import ShopPage from "./pages/shoppage";
import CheckoutPage from "./pages/checkoutpage";
import LoginPage from "./pages/loginpage";
import ProfilePage from "./pages/profilepage";
import SignupPage from "./pages/signuppage";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  
  return (
    <>
     <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/detail" component={DetailPage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/profile" component={ProfilePage} />
        </Switch>
      </Router>
      </>
      
  );
}
export default App;
