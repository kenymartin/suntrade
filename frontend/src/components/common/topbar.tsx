import { isLoggedIn, logout} from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
const TopBar = () => {
  const navigate = useNavigate();
  const data =JSON.parse(localStorage.getItem('user') as string)
  let user =data?.data?.Contact;
  console.log(user)
  const handleLogin = () => {
    navigate('/login');
  }
  const handleLogout = () => {
   try {
    logout();
    navigate('/');
    // window.location.reload();
   } catch (error) {
    console.log(error);
   }
  }
  const handleSignup = () => {
    navigate('/signup');
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href="">
                About
              </a>
              <a className="text-body mr-3" href="">
                Contact
              </a>
              <a className="text-body mr-3" href="">
                Help
              </a>
              <a className="text-body mr-3" href="">
                FAQs
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            {isLoggedIn() ? (
              <p className="text-body mr-3">
                Hello, {`${user?.firstname} ${user?.lastname}`}
              </p>
            ) : (
              <></>
            )}
            <div className="d-inline-flex align-items-center">
            <a className="text-body mr-3" href="">
                Buy
              </a>
              <a className="text-body mr-3" href="">
                Sell
              </a>
              <a className="text-body mr-3" href="">
                Bid
              </a>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  My Account
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  {isLoggedIn() ? (
                    <button
                      onClick={handleLogout}
                      className="dropdown-item"
                      type="button"
                    >
                      <span>Log Out</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleSignup}
                        className="dropdown-item"
                        type="button"
                      >
                        <span>Sign up</span>
                      </button>

                      <button
                        onClick={handleLogin}
                        className="dropdown-item"
                        type="button"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="btn-group mx-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  USD
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    EUR
                  </button>
                  <button className="dropdown-item" type="button">
                    GBP
                  </button>
                  <button className="dropdown-item" type="button">
                    CAD
                  </button>
                </div>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  EN
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    FR
                  </button>
                  <button className="dropdown-item" type="button">
                    AR
                  </button>
                  <button className="dropdown-item" type="button">
                    RU
                  </button>
                </div>
              </div>
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
              <a href="" className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark"></i>
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: "2px" }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href="" className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Solar
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Tec
              </span>
            </a>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">+012 345 6789</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
