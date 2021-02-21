import { memo, FC, useEffect } from 'react';
import { FileTypeFront as FileType } from '@job/common';
import Table from './index';
import { useThunkDispatch } from '@dispatch';
import { downloadFile, setFileErrorMessage } from '@actions';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import Alert from '@components/UI/Alert';

interface Props {
  files: FileType[];
}

const buttonFormatter = (download: any) => (_: undefined, row: FileType) => (
  <button
    className="btn btn-primary padding"
    type="button"
    data-toggle="tooltip"
    data-placment="top"
    title={`Download File ${row.name}`}
    onClick={download(row.path)}
  >
    <i className="fas fa-download" />
  </button>
);

const dateFormatter = (_: undefined, row: FileType) => (
  <span>{new Date(row.createdAt).toLocaleString()}</span>
);

const columns = (download: any) => [
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
    formatter: buttonFormatter(download),
    align: 'center',
    headerAlign: 'center',
    csvExport: false,
  },
];

const redux = createSelector(
  (state: AppState) => state.file.message,
  message => ({ message })
);

const FilesDataTable: FC<Props> = ({ files }) => {
  const dispatch = useThunkDispatch();
  const { message } = useSelector(redux);

  const download = (path: string) => () => dispatch(downloadFile(path));

  const clearResponse = () => dispatch(setFileErrorMessage(''));

  useEffect(() => {
    return () => {
      dispatch(setFileErrorMessage(''));
    };
  }, [dispatch]);

  return (
    <>
      {message && (
        <Alert
          message={message}
          clear={clearResponse}
          className="alert-danger"
        />
      )}
      <div className="DataTable card-body col-12">
        <Table data={files} columns={columns(download)} withClear exportCSV />
      </div>
    </>
  );
};

export default memo(FilesDataTable);
