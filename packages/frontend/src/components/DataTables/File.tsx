import React, { FC } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';

// import Alert from '../../components/UI/Alert';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

interface Props {
  role: string;
  files: any[];
}

const FilesDataTable: FC<Props> = ({ role, files }) => {
  const deleteFile = (_: any) => {
    // props.deleteFileSuper(id, props.history.push);
  };

  const buttonFormatter = (_: any, row: any) => (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-toggle="tooltip"
        data-placment="top"
        title={`Download File ${row.name}`}
      >
        <a href={row.path} style={{ color: '#fff' }} download>
          <i className="fas fa-download" />
        </a>
      </button>
      <button
        className="btn btn-danger padding"
        type="button"
        data-toggle="tooltip"
        data-placment="top"
        title={`Delete File ${row.name}`}
        onClick={() => deleteFile(row._id)}
      >
        <i className="fas fa-trash" />
      </button>
    </>
  );

  const dateFormatter = (_: any, row: any) => (
    <span>{new Date(row.createdAt).toLocaleString()}</span>
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
      dataField: 'createdAt',
      text: 'File Upload Date',
      formatter: dateFormatter,
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'File Name',
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'orderedBy.name',
      text: 'Uploaded by',
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: role === 'admin' || role === 'worker' ? buttonFormatter : null,
      align: 'center',
      headerAlign: 'center',
      csvExport: false,
    },
  ];

  return (
    <div className="DataTable card-body col-12">
      <ToolkitProvider
        bootstrap4
        search
        keyField="name"
        data={files}
        columns={columns as any}
        exportCSV
      >
        {props => (
          <React.Fragment>
            <div className="row mb-20">
              <div className="col-sm-6">
                <ExportCSVButton {...props.csvProps}>
                  Export CSV
                </ExportCSVButton>
              </div>
              <div className="col-sm-6">
                <SearchBar {...props.searchProps} tableId="1" />
                <ClearSearchButton {...props.searchProps} className="btn-sm" />
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
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </div>
  );
};

// {props.files.successMessage && (
//     <Alert
//       message={props.files.successMessage}
//       clear={props.clearMessages}
//       className="success-alert"
//     />
//   )}
//   {props.files.failedMessage && (
//     <Alert
//       message={props.files.failedMessage}
//       clear={props.clearMessages}
//     />
//   )}

export default React.memo(FilesDataTable);
