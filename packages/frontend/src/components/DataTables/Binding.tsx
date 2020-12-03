import React, { FC } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

// import Alert from '../../components/UI/Alert';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';
import { Binding } from 'src/redux/types/paperBinding';

const { SearchBar } = Search;

interface Props {
  role: string;
  bindings: Binding[];
}

const BindingDataTable: FC<Props> = ({ role, bindings }) => {
  const buttonFormatter = (_: any, row: Binding) => (
    <>
      {row.available && (
        <button
          className="btn btn-danger padding"
          type="button"
          data-toggle="tooltip"
          data-placment="top"
          title={`Make Unavailable - ${row.name}`}
          // onClick={() =>
          //   props.updateBindingAvailable(row._id, false, props.history.push)
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
          //   props.updateBindingAvailable(row._id, true, props.history.push)
          // }
        >
          <i className="fas fa-check"></i>
        </button>
      )}
    </>
  );

  const options = {
    sizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 3,
    showTotal: true,
    hideSizePerPage: true,
    paginationTotalRenderer: (start: number, to: number, total: number) => (
      <p>
        {' '}
        From {start} to {to}, totals is {total}{' '}
      </p>
    ),
  };

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      align: 'center',
      headerAlign: 'center',
      sort: true,
      editable: false,
    },
    {
      dataField: 'upTo25',
      text: '25 p',
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
      dataField: 'from25upTo50',
      text: '25 - 50',
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
      dataField: 'from50upTo100',
      text: '50 - 100',
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
      dataField: 'from100upTo150',
      text: '100 - 150',
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

  const updateSinglePrice = (_: string, __: string, ___: number | string) => {
    // props.updateBinding(id, field, value, props.history.push);
  };

  return (
    <div className="DataTable width card-body col-12">
      <ToolkitProvider
        bootstrap4
        search
        keyField="_id"
        data={bindings}
        columns={columns as any}
      >
        {props => (
          <>
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
                  row: Binding,
                  column: any
                ) => updateSinglePrice(row._id, column.dataField, newValue),
              })}
            />
          </>
        )}
      </ToolkitProvider>
    </div>
  );
};

// {props.bindings.successMessage && (
//     <Alert
//       message={props.bindings.successMessage}
//       clear={props.clearMessages}
//       className="success-alert"
//     />
//   )}
//   {props.bindings.failedMessage && (
//     <Alert
//       message={props.bindings.failedMessage}
//       clear={props.clearMessages}
//     />
//   )}

export default React.memo(BindingDataTable);
