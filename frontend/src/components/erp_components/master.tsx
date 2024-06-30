export function Master() {
  return (
    <>
      <div className="grid-container">
        <div className="item1">
          <div className="header-container">
            <div className="header-container_logo">
              <div>
                <img src="./images/solarpanel-logo.png" width="75%" alt="" />
              </div>
              <div className="logo-container "></div>
              <div className="header-container_search">
                <div className="custom-select">
                  <select name="category" id="category">
                    <option selected value="0">
                      All
                    </option>
                    <option value="1">Metal</option>
                    <option value="2">Fibber Glass</option>
                    <option value="3">Customized</option>
                  </select>
                </div>
                <div className="input-field">
                  <input type="text" />
                </div>
              </div>
              <div className="login">
                <div>
                  <p>Hello, Keny</p>
                </div>
                <div className="profile_picture"></div>
              </div>
              <div className="header-container_subheader">
                <nav>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Account</a>
                    </li>
                    <li>
                      <a href="#">Services</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="item2">
            TopMenu
            <nav>
              <ul></ul>
            </nav>
          </div>
          <div className="item3">
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
          </div>
          <div className="item4">
            Main.
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              aliquam autem sed assumenda totam maiores doloribus aspernatur
              repellat. Earum quisquam iusto quasi exercitationem iure
              perferendis dolorem, facere ullam veritatis a. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Reiciendis rem, id quae,
              corporis amet natus velit excepturi ab quia blanditiis perferendis
              consequuntur unde nostrum eum hic maxime consequatur?
              Perspiciatis, dignissimos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              aliquam autem sed assumenda totam maiores doloribus aspernatur
              repellat. Earum quisquam iusto quasi exercitationem iure
              perferendis dolorem, facere ullam veritatis a. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Reiciendis rem, id quae,
              corporis amet natus velit excepturi ab quia blanditiis perferendis
              consequuntur unde nostrum eum hic maxime consequatur?
              Perspiciatis, dignissimos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              aliquam autem sed assumenda totam maiores doloribus aspernatur
              repellat. Earum quisquam iusto quasi exercitationem iure
              perferendis dolorem, facere ullam veritatis a. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Reiciendis rem, id quae,
              corporis amet natus velit excepturi ab quia blanditiis perferendis
              consequuntur unde nostrum eum hic maxime consequatur?
              Perspiciatis, dignissimos.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
              aliquam autem sed assumenda totam maiores doloribus aspernatur
              repellat. Earum quisquam iusto quasi exercitationem iure
              perferendis dolorem, facere ullam veritatis a. Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Reiciendis rem, id quae,
              corporis amet natus velit excepturi ab quia blanditiis perferendis
              consequuntur unde nostrum eum hic maxime consequatur?
              Perspiciatis, dignissimos.
            </p>
          </div>
          <div className="item5">
            <h4>Right</h4>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="item6">Footer</div>
        </div>
      </div>
    </>
  );
}
