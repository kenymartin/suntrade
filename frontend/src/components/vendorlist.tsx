import { Carousel } from "react-bootstrap";

interface vendorListProps {
    vendorImages: any[];
    carouselStyle: {};
}

const VendorList = (props:vendorListProps) => {
    const { vendorImages, carouselStyle } = props;
    
    return (
      <>
        <div className="container-fluid py-5">

          <div className="row px-xl-5">
            <Carousel  activeIndex={1   } indicators={false} className="col">
              <Carousel.Item>
                <div
                  style={carouselStyle}
                  className="owl-carousel vendor-carousel"
                >
                  {vendorImages.map((image) => (
                    <div
                      style={{ margin: ".9rem" }}
                      key={parseInt(image.id)+1}
                      className="bg-light p-4 zoom-vendor-element"
                    >
                      <img src={image.path} alt="" />
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </>
    );
}
 
export default VendorList;