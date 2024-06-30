import { useState } from "react";
import VendorList from "./vendorlist";
import InfinitScroll from "./infinitescroll";

const Vendor = (_props: any) => {
  const [vendorImages, _setVendorImages] = useState([
    { id: 1, path: "/assets/images/vendor-1.jpg" },
    { id: 2, path: "/assets/images/vendor-2.jpg" },
    { id: 3, path: "/assets/images/vendor-3.jpg" },
    { id: 4, path: "/assets/images/vendor-4.jpg" },
    { id: 5, path: "/assets/images/vendor-5.jpg" },
    { id: 6, path: "/assets/images/vendor-6.jpg" },
    { id: 7, path: "/assets/images/vendor-7.jpg" },
    { id: 8, path: "/assets/images/vendor-8.jpg" },

    { id: 9, path: "/assets/images/vendor-1.jpg" },
    { id: 10, path: "/assets/images/vendor-2.jpg" },
    { id: 11, path: "/assets/images/vendor-3.jpg" },
    { id: 12, path: "/assets/images/vendor-4.jpg" },
    { id: 13, path: "/assets/images/vendor-5.jpg" },
    { id: 14, path: "/assets/images/vendor-6.jpg" },
    { id: 15, path: "/assets/images/vendor-7.jpg" },
    { id: 16, path: "/assets/images/vendor-8.jpg" },
  ]);
 
  const carouselStyle = {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
  } 
  return (
    <>
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
            <span className="bg-secondary pr-3">Incoming Products</span>
          </h2>
      <InfinitScroll
        children={
          <VendorList
            vendorImages={vendorImages}
            carouselStyle={carouselStyle}
          />
        }
      />
    </>
  );
}
 
export default Vendor;