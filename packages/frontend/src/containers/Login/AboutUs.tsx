import { memo } from 'react';

const AboutUs = () => (
  <div className="whyus aboutus container-fluid mb-5 z-depth-4">
    <div className="container">
      <div className="d-flex justify-content-center align-items-center flex-wrap flex-md-nowrap">
        <div className="col-md-5 mb-5 mb-md-0">
          <h4 className="h2 display-2">About Us</h4>
          <h6 className="h2 display-4">Who We Are</h6>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#home"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                About
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#profile"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Our Mission
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#contact"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Our Vision
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <p className="mt-5 mb-4 font-size-14px">
                Since its foundation, PrintHouse offers best printing solutions
                and services of high-quality to individual and corporate
                customers throughout the USA.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <p className="mt-5 mb-4 font-size-14px">
                Our mission is to surpass our client&apos;s expectations on
                every project with superior quality, service, and value. We
                treat every customer with sincerity and fairness.
              </p>
            </div>
            <div
              className="tab-pane fade"
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <p className="mt-5 mb-4 font-size-14px">
                We aim to help our clients create printed materials of any
                complexity, while improving our solutions. Our qualified team
                can put any idea of our customers into reality.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-7 ml-md-5 d-none d-md-block">
          <img
            className="z-depth-4"
            src="https://www.johnewright.com/wp-content/uploads/2015/05/Print_Cafe_03-1170x528.jpg"
            alt="print Shop"
          />
        </div>
      </div>
    </div>
  </div>
);

export default memo(AboutUs);
