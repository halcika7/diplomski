import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import './index.css';
import img from '@images/book-stack-books-bookshop-264635.jpg';
import img1 from '@images/book-bindings-books-indoors-2041540.jpg';
import img2 from '@images/all-bong-7cq0F-sTw9M-unsplash.jpg';
import img3 from '@images/bank-phrom-Tzm3Oyu_6sk-unsplash.jpg';
import img4 from '@images/large-format-printing-1243566-638x480.jpg';
import img5 from '@images/old-youth-lDDyRE1Ec8Q-unsplash.jpg';
import img6 from '@images/plotter-in-action-1511025-640x480.jpg';

const Carousell = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="carousel-wrapper z-depth-4">
        <Carousel showThumbs={false} dynamicHeight>
          <div>
            <img src={img} alt="" />
          </div>
          <div>
            <img src={img1} alt="" />
          </div>
          <div>
            <img src={img2} alt="" />
          </div>
          <div>
            <img src={img3} alt="" />
          </div>
          <div>
            <img src={img4} alt="" />
          </div>
          <div>
            <img src={img5} alt="" />
          </div>
          <div>
            <img src={img6} alt="" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Carousell;
