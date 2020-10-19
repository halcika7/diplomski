import React from 'react';

import img from '@images/smartmockups_jzx6rltz.jpg';

const Printing = () => (
  <div className="container-fluid">
    <div className="container printing">
      <h3 className="display-2 text-center">How We Make Printing As Easy</h3>
      <div className="row justify-content-center">
        <div className="col-lg-4 mt-4 mt-lg-0 mb-4">
          <div className="card text-center z-depth-4">
            <div className="icon bg-danger first">
              <i className="fas fa-newspaper"></i>
              <i className="fas fa-hand-point-up"></i>
            </div>
            <div className="card-body text-center">
              <p className="h4 mb-4 mt-2 bold">Select Option</p>
              <span className="text-danger h3 mb-2 bold">01</span>
              <p className="font-size-14px mt-4 mb-4">
                Choose options that you want for your prints. We will make you
                happy with your choices.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0 mb-4">
          <div className="card text-center z-depth-4">
            <div className="icon bg-warning second">
              <i className="fas fa-file-alt"></i>
              <i className="fas fa-arrow-alt-circle-up"></i>
            </div>
            <div className="card-body text-center">
              <p className="h4 mb-4 mt-2 bold">Upload Your Design</p>
              <span className="text-warning h3 mb-2 bold">02</span>
              <p className="font-size-14px mt-4 mb-4">
                Upload your finished design here and we'll print it for you with
                your choices
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card text-center z-depth-4">
            <div className="icon bg-info">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="card-body text-center">
              <p className="h4 mb-4 mt-2 bold">Checkout & Order</p>
              <span className="text-info h3 mb-2 bold">03</span>
              <p className="font-size-14px mt-4 mb-4">
                Checkout and finish your order very easy with one step checkout
                extension.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 d-none d-md-block">
          <img className="z-depth-4" src={img} alt="desk" />
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(Printing);
