
import _ from 'lodash';

// import { Link } from 'react-router-dom';
// const Products = [
//   { id: 1, name: "air conditioning" },
//   { id: 2, name: "balloon" },
//   { id: 3, name: "charger" },
//   { id: 4, name: "backpack" },
//   { id: 5, name: "cell phone charger" },
//   { id: 6, name: "Strawberry Tree" },
//   { id: 7, name: "chimney" },
//   { id: 8, name: "powered waste compacting bin" },
//   { id: 9, name: "powered water pump" },
//   { id: 10, name: "powered water heater" },
//   { id: 11, name: "powered water cooler" },
//   { id: 14, name: "powered water dispenser" },
//   { id: 15, name: "powered water purifier" },
//   { id: 16, name: "cooker" },
//   { id: 17, name: "dryer" },
//   { id: 18, name: "powered fan" },
//   //     furnace
//   //     inverter
//   //     keyboard
//   //     lamp
//   //     pond
//   //     road stud
//   //     street light
//   //     traffic light
//   //     Tuki
//   //    powered flashlight
//   //     notebook
//   //    powered calculator
//   //    powered desalination unit
//   //    powered pump
//   //     PV Junction box
//   //    powered fountain in a bird bath under shade versus direct sunlight
//   //    powered fountain
//   //    powered radio
//   //    powered refrigerator
//   //    powered Stirling engine
//   //    powered watch
//   //    pumped laser
//   //     roadway
//   //     Spark Lighter
//   //     still
//   //     tree
//   //     vehicle
//   //     balloon
//   //     boat
//   //    Tûranor Planet
//   //     bus
//   //     car
//   //    Stella ( vehicles)
//   //     golf cart
//   //     panels on spacecraft
//   //     sail
//   //     thermal rocket
//   // ]
// ];

const categories =[
    {id:1,description:'Solar Panels & Kits', hasChildren:true,subcategories:[{id:1,description:'Solar Panels & Kits',hasChildren:false}]},
    {id:2,description:'Solar Power Accessories', hasChildren:false,subcategories:[]},
    {id:3,description:'Solar Lighting', hasChildren:false,subcategories:[]},
    {id:4,description:'Solar Water Heating Systems', hasChildren:false,subcategories:[]},
    {id:5,description:'Solar-Powered Appliances',hasChildren:false,subcategories:[]},
    {id:6,description:'Off-Grid Solar Solutions', hasChildren:true  ,subcategories:[{id:1,description:'Solar Panels & Kits',hasChildren:false}]}
]

const   NavBar = () => {
    return ( 
        <>
    <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: "65px", padding: "0 30px" }}>
                <h6 className="text-dark m-0"><i className="fa fa-bars mr-2"></i>Categories</h6>
                <i className="fa fa-angle-down text-dark"></i>
                </a>
                <nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{width: "calc(100% - 30px)", zIndex: "99"}}>
                 <div className="navbar-nav w-100">
                  <div className="nav-item dropdown dropright">
                    {categories.map((item) => (
                        <div key={item.id} className="nav-item dropdown dropright">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    {item.description}
                                    {item.subcategories.length > 0 && <i className="fa fa-angle-right float-right mt-1"></i>}
                                </a>
                            {item.subcategories.length > 0 && (
                            <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                                    {item.subcategories.map((subitem) => (
                                    <a key={subitem.id} href="#" className="dropdown-item">
                                        {subitem.description}
                                    </a>
                                    ))}
                            </div>
                        )}
                   </div>
                ))}
                  </div>
                    
                    </div>
                </nav>
            </div>
            <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a href="" className="text-decoration-none d-block d-lg-none">
                        <span className="h1 text-uppercase text-dark bg-light px-2">Green</span>
                        <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Solution</span>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            <a href="/" className="nav-item nav-link active">Home</a>
                            <a href="/sell" className="nav-item nav-link">Sell</a>
                            <a href="/buy" className="nav-item nav-link">Buy</a>
                            <a href="/detail" className="nav-item nav-link">Shop Detail</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages <i className="fa fa-angle-down mt-1"></i></a>
                                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                
                                    <a href="checkout.html" className="dropdown-item">Checkout</a>
                                </div>
                            </div>
                                    <a href="/contact" className="nav-item nav-link">Contact</a>
                                    {/* <Link  to="/contact" className="nav-item nav-link" >Contact</Link> */}
                        </div>
                        <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <a href="" className="btn px-0">
                                <i className="fas fa-heart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                            </a>
                            <a href="" className="btn px-0 ml-3">
                                <i className="fas fa-shopping-cart text-primary"></i>
                                        <span className="badge text-secondary border border-secondary rounded-circle" style={ {paddingBottom: "2px"}}>0</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
        </>

     );
}
 
export default NavBar;