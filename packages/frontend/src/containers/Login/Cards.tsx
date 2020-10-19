import React from 'react';

const Cards = () => (
  <div className="container pt-3">
    <div className="row" style={{ padding: '30px 0' }}>
      <div className="col-md-6 mb-4">
        <div className="card bg-warning text-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
          <div className="card-header">
            <h3 className="h1 m-0 display-1">Newspaper</h3>
            <p className="h2 m-0 display-2">Printing</p>
          </div>
          <div className="card-body">
            <p className="m-0 h4 font-size-14px">
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card bg-primary text-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
          <div className="card-header">
            <h3 className="h1 m-0 display-1">Magazine</h3>
            <p className="h2 m-0 display-2">Printing</p>
          </div>
          <div className="card-body">
            <p className="m-0 h4 font-size-14px">
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card bg-info text-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
          <div className="card-header">
            <h3 className="h1 m-0 display-1">Book</h3>
            <p className="h2 m-0 display-2">Printing</p>
          </div>
          <div className="card-body">
            <p className="m-0 h4 font-size-14px">
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card bg-danger text-white z-depth-4 pt-2 pb-2 pr-2 pl-2 h-100">
          <div className="card-header">
            <h3 className="h1 m-0 display-1">Poster</h3>
            <p className="h2 m-0 display-2">Printing</p>
          </div>
          <div className="card-body">
            <p className="m-0 h4 font-size-14px">
              Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(Cards);
