const LeftMenu = (

) => {
    return ( 
        <nav>
        <ul className="leftmenu">
          <li className="active">
            <a href="#">
              <i className="fi fi-rs-house-chimney"></i>
            </a>
          </li>

          <li>
            <a href="#">
              <i className="fi fi-rs-search"></i>
            </a>
          </li>

          <li>
            <a href="#">
              <i className="ffi fi-rs-user"></i>
            </a>
          </li>

          <li data-notifycation_number="9">
            <a href="#">
              <i className="fi fi-rs-bell"></i>
            </a>
          </li>

          <li>
            <a href="#">
              <i className="fi fi-rs-solar-panel"></i>
            </a>
          </li>

          <li>
            <a href="#">
              <i className="fi fi-rs-circle-ellipsis"></i>
            </a>
          </li>
        </ul>
      </nav>
     );
}
 
export default LeftMenu;