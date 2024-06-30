import Login from "./login";
import LogoContainer from "./logo";
import Search from "./search";
import Subheader from "./subheader";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-container_logo">
        <LogoContainer />
      </div>
      <div className="header-container_search">
       <Search/>
      </div>
      <div className="login">
        <Login/>
      </div>
      <div className="header-container_subheader">
        <Subheader/>
      </div>
    </div>
  );
};

export default Header;
