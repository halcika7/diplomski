import { memo, FC } from 'react';
import { FileTypeFront as FileType } from '@job/common';
import Table from './index';

interface Props {
  files: FileType[];
}

const buttonFormatter = (_: undefined, row: FileType) => (
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
);

const dateFormatter = (_: undefined, row: FileType) => (
  <span>{new Date(row.createdAt).toLocaleString()}</span>
);

const columns = [
  {
    dataField: 'createdAt',
    text: 'File Order Date',
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
    formatter: buttonFormatter,
    align: 'center',
    headerAlign: 'center',
    csvExport: false,
  },
];

const FilesDataTable: FC<Props> = ({ files }) => (
  <div className="DataTable card-body col-12">
    <Table data={files} columns={columns} withClear exportCSV />
  </div>
);

export default memo(FilesDataTable);
