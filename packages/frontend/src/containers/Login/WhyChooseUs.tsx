import { memo } from 'react';

const WhyChooseUs = () => (
  <div className="whyus container-fluid mt-5" style={{ padding: '100px 0' }}>
    <h3 className="h2 text-center mb-5 display-2">Why Choose Us</h3>
    <div className="container pt-3">
      <div
        className="row justify-content-center row-eq-height"
        style={{ padding: '50px 0' }}
      >
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-ribbon"
                  style={{ fontSize: '3rem', color: '#f5365c' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">High Quality</h5>
                <p className="font-size-12px">
                  We provide high-quality printing solutions, products, and
                  services to all our clients.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-server"
                  style={{ fontSize: '3rem', color: '#11cdef' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">Services</h5>
                <p className="font-size-12px">
                  We deliver a variety of printing services for you to choose
                  what you need the most.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-rocket"
                  style={{ fontSize: '3rem', color: '#8965e0' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">Speed</h5>
                <p className="font-size-12px">
                  Our team works fast to bring you the best posters, brochures,
                  and other products.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-trophy"
                  style={{ fontSize: '3rem', color: '#ffd600' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">Low Prices</h5>
                <p className="font-size-12px">
                  Our affordable pricing allows you to save a lot on our
                  printing services.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-thumbs-up"
                  style={{ fontSize: '3rem', color: '#F4B2A3' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">Quality Printing</h5>
                <p className="font-size-12px">
                  Bright inks. Thick Paper. Precise cuts. We believe that
                  quality...{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-paper-plane"
                  style={{ fontSize: '3rem', color: '#B9D5FD' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">Timely Delivery</h5>
                <p className="font-size-12px">
                  No printer is faster. Order today by 8:00pm EST and you can
                  even ge
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-leaf"
                  style={{ fontSize: '3rem', color: '#65929A' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">Eco-Minded</h5>
                <p className="font-size-12px">
                  Overnight Prints is the greenest online printer in the world.
                  See our{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-xl-3 mb-4">
          <div className="card bg-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
            <div className="card-body d-flex align-items-center flex-lg-nowrap">
              <div className="icon mr-3">
                <i
                  className="fas fa-money-bill-alt"
                  style={{ fontSize: '3rem', color: '#B3D6B5' }}
                />
              </div>
              <div className="text">
                <h5 className="h4 mb-1">Money Back</h5>
                <p className="font-size-12px">
                  Most sellers work with buyers to quickly resolve issues, but
                  if a{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default memo(WhyChooseUs);
