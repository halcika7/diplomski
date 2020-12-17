import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import classes from './index.module.css';
import Spinner from '@components/UI/Spinner/Spinner';
import { getPaperBindings } from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { useThunkDispatch } from '@dispatch';

const reduxProps = createSelector(
  (state: AppState) => state.paperBinding.papers,
  (state: AppState) => state.paperBinding.bindings,
  (papers, bindings) => ({ papers, bindings })
);

const Pricing = () => {
  const dispatch = useThunkDispatch();
  const { papers, bindings } = useSelector(reduxProps);

  useEffect(() => {
    dispatch(getPaperBindings);
  }, [dispatch]);

  return (
    <div className="card" style={{ minHeight: '80vh', paddingBottom: '3rem' }}>
      <Helmet>
        <title>Pricing</title>
        <meta name="description" content="Pricing page in Print shop app" />
        <meta
          property="og:description"
          content="Pricing page in Print shop app"
        />
      </Helmet>
      {papers.length > 0 && bindings.length > 0 ? (
        <div className="card-body">
          <div className="col-12 mb-5">
            <h3 className="col-12 card-title mb-4 text-center d-inline-block">
              DOCUMENT PRODUCTION
            </h3>
            <h4
              style={{
                color: '#2aabe4',
                fontWeight: 'bold',
                fontSize: '1.7em',
                fontFamily: 'hcondensed',
              }}
            >
              BLACK & WHITE PRINTING / COPYING
            </h4>
            <div className="d-flex">
              <ul className={classes.price_ul}>
                <li>1 - 250</li>
                <li>250 - 500</li>
                <li>500 - 1000</li>
                <li>1000+</li>
              </ul>
              <div className="table-responsive">
                <table className={classes.table + ' mt-3'}>
                  <tbody>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={paper.name + i}>Per copy {paper.name}</td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'priceblackwhite0' + i}>
                          {paper.blackWhitePrinting.upTo250} KM
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'priceblackwhite1' + i}>
                          {paper.blackWhitePrinting.from250upTo500} KM
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'priceblackwhite2' + i}>
                          {paper.blackWhitePrinting.from500upTo1000} KM
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'priceblackwhite3' + i}>
                          {paper.blackWhitePrinting.from1000} KM
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h4
              style={{
                color: '#2aabe4',
                fontWeight: 'bold',
                fontSize: '1.7em',
                fontFamily: 'hcondensed',
                marginTop: '2rem',
              }}
            >
              COLOR PRINTING / COPYING
            </h4>
            <div className="d-flex">
              <ul className={classes.price_ul}>
                <li>1 - 250</li>
                <li>250 - 500</li>
                <li>500 - 1000</li>
                <li>1000+</li>
              </ul>
              <div className="table-responsive">
                <table className={classes.table + ' mt-3'}>
                  <tbody>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={paper.name + i + 'color'}>
                          Per copy {paper.name}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'colorPrinting0' + i}>
                          {paper.colorPrinting.upTo250} KM
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'colorPrinting1' + i}>
                          {paper.colorPrinting.from250upTo500} KM
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'colorPrinting2' + i}>
                          {paper.colorPrinting.from500upTo1000} KM
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {papers.map((paper, i: number) => (
                        <td key={'colorPrinting3' + i}>
                          {paper.colorPrinting.from1000} KM
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-12">
            <h3 className="col-12 card-title mb-4 text-center d-inline-block">
              DOCUMENT BINDING
            </h3>
            {bindings.map((binding, i: number) => (
              <React.Fragment key={'heading' + i}>
                <h4
                  style={{
                    color: '#2aabe4',
                    fontWeight: 'bold',
                    fontSize: '1.7em',
                    fontFamily: 'hcondensed',
                  }}
                >
                  {binding.name} Binding
                </h4>
                <table className={classes.table + ' mt-3 mb-3'}>
                  <tbody>
                    <tr>
                      <td />
                      <td>Per Document</td>
                    </tr>
                    <tr>
                      <td>1 - 25 pages</td>
                      <td>{binding['upTo25']} KM</td>
                    </tr>
                    <tr>
                      <td>25 - 50 pages</td>
                      <td>{binding['from25upTo50']} KM</td>
                    </tr>
                    <tr>
                      <td>50 - 100 pages</td>
                      <td>{binding['from50upTo100']} KM</td>
                    </tr>
                    <tr>
                      <td>100 - 150 pages</td>
                      <td>{binding['from100upTo150']} KM</td>
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="card-body">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default React.memo(Pricing);
