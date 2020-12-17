import React, { FC } from 'react';

interface Props {
  image: string;
  name: string;
  fLink?: string;
  tLink?: string;
}

const RightPart: FC<Props> = ({ image, name, fLink, tLink }) => (
  <div className="col-md-4">
    <div className="card-user card">
      <div className="card-body">
        <p className="card-text" />
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
          <img
            alt={name}
            className="avatar"
            src={image}
            style={{ objectFit: 'cover' }}
          />
          <h5 className="title">{name}</h5>
        </div>
      </div>
      {(fLink || tLink) && (
        <div className="card-footer">
          <div className="button-container">
            {fLink && (
              <a
                aria-label="Facebook"
                href={fLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon btn-round btn btn-facebook"
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '38px',
                  height: '38px',
                }}
              >
                <i className="fab fa-facebook" />
              </a>
            )}
            {tLink && (
              <a
                aria-label="Twitter"
                href={tLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon btn-round btn btn-twitter"
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '38px',
                  height: '38px',
                }}
              >
                <i className="fab fa-twitter" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default React.memo(RightPart);
