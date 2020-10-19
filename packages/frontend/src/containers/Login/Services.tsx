import React from 'react';

const Services = () => (
  <div className="container-fluid whyus">
    <div
      className="container"
      style={{ padding: '100px 0', borderTop: '1px solid #111' }}
    >
      <h3 className="display-2 text-center mb-2">Our Services</h3>
      <p className="mt-3 font-size-14px text-center mb-5">
        Choose the design path that is right before upload file
      </p>
      <div className="row pt-5">
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card z-depth-4 h-100">
            <div className="card-body p-0 text-center">
              <div className="img">
                <img
                  src="https://www.itsnicethat.com/system/files/122018/5c1781db7fa44c5a800003ac/index_default/INT-ROTY-GraphicDesign-List.png?1545203083"
                  alt=""
                />
              </div>
              <h4 className="h4 mt-3">Graphic Design</h4>
              <p className="font-size-12px mb-4">
                Let us design your next print project!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card z-depth-4 h-100">
            <div className="card-body p-0 text-center">
              <div className="img">
                <img
                  src="https://marketingdesdecero.com/wp-content/uploads/2018/11/Gestionar-emails-y-campa%C3%B1as-de-mailing-marketing-1024x820.jpg"
                  alt=""
                  height="171.84"
                  width="100%"
                />
              </div>
              <h4 className="h4 mt-3">Mailing</h4>
              <p className="font-size-12px mb-4">
                Delivery, we can hand it all for ypu!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card z-depth-4 h-100">
            <div className="card-body p-0 text-center">
              <div className="img">
                <img
                  src="https://www.alocalprinter.co.uk/media/wysiwyg/ALP/Non_Product_Page_Images/CMS_custom_print.jpg"
                  alt=""
                  height="171.84"
                  width="100%"
                />
              </div>
              <h4 className="h4 mt-3">Custom Prints</h4>
              <p className="font-size-12px mb-4">
                We'll bring all your creative ideas to life!
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3 mb-4">
          <div className="card z-depth-4 h-100">
            <div className="card-body p-0 text-center">
              <div className="img">
                <img
                  src="https://static.printrunner.com/images/filecheckheader.jpg"
                  alt=""
                  height="171.84"
                  width="100%"
                />
              </div>
              <h4 className="h4 mt-3">Free file check</h4>
              <p className="font-size-12px mb-4">
                We'll if your file is ready to print!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(Services);
