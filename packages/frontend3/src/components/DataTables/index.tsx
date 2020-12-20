import React, { FC } from 'react';

// components
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';

// types
import {
  BindingFront as Binding,
  PaperFront as Paper,
  FileTypeFront as FileType,
} from '@job/common';
import { Order } from 'src/redux/types/order';
import { User } from 'src/redux/types/user';

// css
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

export const options = {
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

interface Props {
  data: Binding[] | Order[] | Paper[] | User[] | FileType[];
  onCellEdit?: (id: string, field: string, value: string) => void;
  columns: any[];
  exportCSV?: boolean;
  withClear?: boolean;
  rowClasses?: (row: Order, index: number) => string;
}

type RowType = Binding | Order | Paper | User | FileType;

const Table: FC<Props> = ({
  data,
  onCellEdit,
  columns,
  exportCSV,
  withClear,
  rowClasses,
}) => (
  <ToolkitProvider
    bootstrap4
    search
    keyField="_id"
    data={data}
    columns={columns}
    exportCSV={exportCSV}
  >
    {props => (
      <>
        <div className="row mb-20">
          {exportCSV && (
            <div className="col-sm-6">
              {data.length > 0 && (
                <ExportCSVButton {...props.csvProps}>
                  Export CSV
                </ExportCSVButton>
              )}
            </div>
          )}
          <div className="col-sm-6">
            {data.length > 0 && (
              <>
                <SearchBar {...props.searchProps} tableId="1" />
                {withClear && (
                  <ClearSearchButton
                    {...props.searchProps}
                    className="btn-sm"
                  />
                )}
              </>
            )}
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
          rowClasses={rowClasses}
          cellEdit={
            onCellEdit &&
            cellEditFactory({
              mode: 'click',
              beforeSaveCell: (
                _: undefined,
                newValue: string,
                row: RowType,
                column: Record<string, string>
              ) => onCellEdit(row._id as string, column.dataField, newValue),
            })
          }
        />
      </>
    )}
  </ToolkitProvider>
);

export default Table;
