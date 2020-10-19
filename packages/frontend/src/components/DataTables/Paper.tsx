import React, { FC } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

// import Alert from '../../components/UI/Alert';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';
import { Paper } from 'src/redux/types/paperBinding';

const { SearchBar } = Search;

interface Props {
  role: string;
  papers: Paper[];
}

const PriceDataTable: FC<Props> = ({ role, papers }) => {
  const buttonFormatter = (_: any, row: Paper) => (
    <>
      {row.available && (
        <button
          className="btn btn-danger padding"
          type="button"
          data-toggle="tooltip"
          data-placment="top"
          title={`Make Unavailable - ${row.name}`}
          // onClick={() =>
          //   props.updatePaperAvailable(row._id, false, props.history.push)
          // }
        >
          <i className="far fa-times-circle"></i>
        </button>
      )}
      {!row.available && (
        <button
          className="btn btn-success padding"
          type="button"
          data-toggle="tooltip"
          data-placment="top"
          title={`Make Available - ${row.name}`}
          // onClick={() =>
          //   props.updatePaperAvailable(row._id, true, props.history.push)
          // }
        >
          <i className="fas fa-check"></i>
        </button>
      )}
    </>
  );

  const options = {
    sizePerPage: 20,
    pageStartIndex: 1,
    paginationSize: 3,
    showTotal: true,
    hideSizePerPage: true,
    paginationTotalRenderer: (start: any, to: any, total: any) => (
      <p>
        {' '}
        From {start} to {to}, totals is {total}{' '}
      </p>
    ),
  };

  const paperColumns = [
    {
      dataField: 'name',
      text: 'Name',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      editable: false,
    },
    {
      dataField: 'blackWhitePrinting.upTo250',
      text: 'B/W 250',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'blackWhitePrinting.from250upTo500',
      text: 'B/W 250 - 500',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'blackWhitePrinting.from500upTo1000',
      text: 'B/W 500 - 1000',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'blackWhitePrinting.from1000',
      text: 'B/W 1000+',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'colorPrinting.upTo250',
      text: 'Color 250',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'colorPrinting.from250upTo500',
      text: 'Color 250 - 500',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'colorPrinting.from500upTo1000',
      text: 'Color 500 - 1000',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'colorPrinting.from1000',
      text: 'Color 1000+',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      validator: (newValue: number | string) => {
        if (Number.isNaN(newValue) || newValue <= 0) {
          return {
            valid: false,
            message: 'Price should be numeric and greater than 0',
          };
        }
        return true;
      },
    },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: role === 'admin' || role === 'worker' ? buttonFormatter : null,
      align: 'center',
      headerAlign: 'center',
      csvExport: false,
      editable: false,
    },
  ];

  const updateSinglePaper = (_: string, ___: string, __: number | string) => {
    // const option =
    //   field.slice(0, 2) === 'bw' ? 'blackWhitePrinting' : 'colorPrinting';
    // const innerOption = field.slice(2);
    // props.updatePaper(id, option, innerOption, value, props.history.push);
  };

  return (
    <div className="DataTable big card-body col-12">
      <ToolkitProvider
        bootstrap4
        search
        keyField="_id"
        data={papers}
        columns={paperColumns as any}
      >
        {props => (
          <React.Fragment>
            <div className="row mb-20">
              <div className="col-sm-6">
                <SearchBar {...props.searchProps} tableId="1" />
              </div>
            </div>
            <BootstrapTable
              noDataIndication={() => <div>No data available</div>}
              wrapperClasses={'table-responsive UsersTable'}
              {...props.baseProps}
              striped
              hover
              bordered={false}
              filter={filterFactory()}
              pagination={paginationFactory(options)}
              cellEdit={cellEditFactory({
                mode: 'click',
                beforeSaveCell: (
                  _: any,
                  newValue: number | string,
                  row: Paper,
                  column: any
                ) => updateSinglePaper(row._id, column.dataField, newValue),
              })}
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </div>
  );
};

// {props.papers.successMessage && (
//     <Alert
//       message={props.papers.successMessage}
//       clear={props.clearMessages}
//       className="success-alert"
//     />
//   )}
//   {props.papers.failedMessage && (
//     <Alert
//       message={props.papers.failedMessage}
//       clear={props.clearMessages}
//     />
//   )}

export default React.memo(PriceDataTable);
