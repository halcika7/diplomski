import { FC, useEffect } from 'react';
import { FileDocument } from '@job/common';
import { truncText } from '../../../helpers/truncText';
import { downloadFile, setFileErrorMessage } from '@actions';

import pdfImg from '@images/pdf-image.png';
import wordImg from '@images/word-image.png';
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Alert from '../Alert';

interface Props {
  documents: FileDocument[];
  totalPrice: number;
  deleteFile?: (val: string) => void;
  deleteFiles?: () => void;
}

const redux = createSelector(
  (state: AppState) => state.file.message,
  message => ({ message })
);

const FilesTable: FC<Props> = ({
  documents,
  totalPrice,
  deleteFile,
  deleteFiles,
}) => {
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
    <div className="col-12">
      {message && (
        <Alert
          message={message}
          clear={clearResponse}
          className="alert-danger"
        />
      )}
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">
            {deleteFile ? (
              <strong>Uploaded files</strong>
            ) : (
              <strong>Order files</strong>
            )}
          </h4>
          {deleteFiles && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteFiles}
            >
              Remove files
            </button>
          )}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="tablesorter table"
              style={{ width: 'max-content', minWidth: '100%' }}
            >
              <thead className="text-primary">
                <tr>
                  <th>Name</th>
                  <th>Number of Pages</th>
                  <th>Number Of Copies</th>
                  <th>Paper type</th>
                  <th>Binding</th>
                  <th>Print Option</th>
                  <th>Price</th>
                  <th aria-labelledby="Buttons" />
                </tr>
              </thead>
              <tbody>
                {documents.map(file => (
                  <tr key={file._id}>
                    <td>
                      <img
                        src={
                          file.name.slice(
                            file.name.length - 3,
                            file.name.length
                          ) === 'pdf'
                            ? pdfImg
                            : wordImg
                        }
                        alt="document pic"
                        height="30"
                        width="30"
                        style={{ marginRight: '10px' }}
                      />
                      {truncText(file.name)}
                    </td>
                    <td>{file.pages}</td>
                    <td>{file.copies}</td>
                    <td>{file.paper}</td>
                    <td>{file.binding ? file.binding : 'none'}</td>
                    <td>{file.print}</td>
                    <td>{file.price} KM</td>
                    <td>
                      {deleteFile ? (
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          title={`Delete Document - ${file.name}`}
                          onClick={() => deleteFile(file._id)}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary padding"
                          type="button"
                          onClick={download(file.path)}
                        >
                          <i className="fas fa-download" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="border-0" style={{ color: '#111' }}>
                    Total Price + PDV ( 17 % ) -{' '}
                    <strong>{totalPrice} KM</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesTable;
