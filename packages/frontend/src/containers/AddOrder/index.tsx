import React, { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Select from '@components/UI/Select';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import UploadFile from '@components/UI/Input/UploadFile';
import { useThunkDispatch } from '@dispatch';
import {
  uploadFile as uploadFileAction,
  getPapersBindings,
  getCart,
  clearCart,
  removeDocument,
  postOrder,
  resetUploadStatus,
  setOrderMessage,
} from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import FilesTable from '@components/UI/FilesTable';
import { PostOrderErrors } from '@reducers/order';
import { UploadFileErrors } from '@reducers/upload';
import Alert from '@components/UI/Alert';

const reduxProps = createSelector(
  (state: AppState) => state.upload,
  (state: AppState) => state.cart.documents,
  (state: AppState) => state.cart.totalCost,
  (state: AppState) => state.order.message,
  (state: AppState) => state.order.status,
  (state: AppState) => state.order.errors,
  (...props) => props
);

const validPrintOptions = ['Color', 'Black/White'];
const validUseFor = ['Personal', 'University'];

const AddOrder = () => {
  const dispatch = useThunkDispatch();
  const [
    upload,
    documents,
    totalCost,
    message,
    status,
    orderErrors,
  ] = useSelector(reduxProps);
  const [file, setFile] = useState<File>();
  const [numberOfCopies, setNumberOfCopies] = useState<number>(1);
  const [printOption, setPrintOption] = useState<string>('');
  const [paperOption, setPaperOption] = useState<string>('');
  const [bindingOption, setBindingOption] = useState<string>('');
  const [useFor, setUseFor] = useState<string>('Personal');
  const [errors, setErrors] = useState<PostOrderErrors & UploadFileErrors>({
    ...orderErrors,
    ...upload.errors,
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const isDisabled = () => {
    if (
      !numberOfCopies ||
      Number.isNaN(numberOfCopies) ||
      !validPrintOptions.includes(printOption) ||
      !upload.papers.includes(paperOption) ||
      !upload.bindings.includes(bindingOption) ||
      !file ||
      uploading
    ) {
      return true;
    }

    return false;
  };

  const isSubmitDisabled = () =>
    documents.length < 1 || !validUseFor.includes(useFor) || sending;

  const uploadFile = (e: any) => {
    e.preventDefault();

    if (isDisabled()) return;

    setUploading(prev => !prev);

    const data = new FormData();
    data.append('print', printOption);
    data.append('paper', paperOption);
    data.append('copies', numberOfCopies.toString());
    data.append('binding', bindingOption);
    data.append('file', file as Blob);
    dispatch(uploadFileAction(data));
  };

  const changeNumberOfCopies = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!Number.isNaN(value) && parseInt(value) > 0 && value) {
      setNumberOfCopies(parseInt(value, 10));
    }
  };

  const deleteFiles = () => dispatch(clearCart);

  const deleteFile = (id: string) => dispatch(removeDocument(id));

  const clearUploadStatus = () => dispatch(resetUploadStatus);

  const clearOrderStatus = () => dispatch(setOrderMessage('', null));

  const addOrder = () => {
    if (isSubmitDisabled()) return;
    clearUploadStatus();
    setSending(true);
    dispatch(postOrder(useFor));
  };


  const resetAfterUpload = useCallback(() => {
    setUploading(false);
    setFile(undefined);
    setNumberOfCopies(1);
    setPrintOption('');
    setPaperOption('');
    setBindingOption('');
  }, []);

  useEffect(() => {
    dispatch(getPapersBindings);
    dispatch(getCart);
  }, [dispatch]);

  useEffect(() => {
    setErrors({
      ...orderErrors,
      ...upload.errors,
    });
  }, [orderErrors, upload.errors]);

  useEffect(() => {
    if (upload.status === 200) {
      resetAfterUpload();
    }

    if(upload.status === 400) {
      setUploading(false);
    }
  }, [upload.status, resetAfterUpload]);

  useEffect(() => {
    if (status) {
      resetAfterUpload();
      setSending(false);
      setUseFor('Personal');
    }
  }, [status,resetAfterUpload]);

  useEffect(() => {
    return () => {
      dispatch(resetUploadStatus);
      dispatch(setOrderMessage('', null));
      dispatch(resetUploadStatus);
    };
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Add Order</title>
        <meta
          name="description"
          content="Add Order page in Print Shop Web App"
        />
        <meta
          property="og:description"
          content="Add Order page in Print Shop Web App"
        />
      </Helmet>
      {upload.message && (
        <Alert
          message={upload.message}
          clear={clearUploadStatus}
          className={upload.status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      {message && (
        <Alert
          message={message}
          clear={clearOrderStatus}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="title">Add new Order</h5>
            </div>
            <div className="card-body">
              <UploadFile
                setFile={setFile}
                file={file}
                error={errors.file}
                span={!!message && upload.status === 200}
              />
              <div className="row">
                <div className="col-sm-3 mb-3">
                  <InputWithLabel
                    label="Number of Copies"
                    placeholder="Number Of Copies"
                    type="number"
                    classes="form-control"
                    value={numberOfCopies}
                    onChange={changeNumberOfCopies}
                    step="1"
                    min="1"
                    error={errors.numberOfCopies}
                    name="number_of_copies"
                  />
                </div>
                <div className="col-sm-3 mb-3">
                  <Select
                    label="Print Option"
                    option="print"
                    value={printOption}
                    change={setPrintOption}
                    error={errors.printOption}
                  />
                </div>
                <div className="col-sm-3 mb-3">
                  <Select
                    label="Paper Option"
                    value={paperOption}
                    change={setPaperOption}
                    values={upload.papers}
                    error={errors.paperOption}
                  />
                </div>
                <div className="col-sm-3 mb-3">
                  <Select
                    label="Binding Option"
                    value={bindingOption}
                    change={setBindingOption}
                    values={upload.bindings}
                    error={errors.bindingOption}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={uploadFile}
                    disabled={isDisabled()}
                  >
                    Confirm File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {documents.length > 0 && (
          <>
            <FilesTable
              documents={documents}
              totalPrice={totalCost}
              deleteFile={deleteFile}
              deleteFiles={deleteFiles}
            />
            <div className="col-12">
              <div className="card">
                <div className="col-12 col-sm-5 mb-4">
                  <Select
                    label="Use for"
                    option="use"
                    value={useFor}
                    change={setUseFor}
                    error={errors.useFor}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={addOrder}
                disabled={isSubmitDisabled()}
              >
                Submit Order
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default React.memo(AddOrder);
