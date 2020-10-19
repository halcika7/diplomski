import React, { useState, useEffect } from 'react';
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
} from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import FilesTable from '@components/UI/FilesTable';

const reduxProps = createSelector(
  (state: AppState) => state.upload.bindings,
  (state: AppState) => state.upload.papers,
  (state: AppState) => state.cart.documents,
  (state: AppState) => state.cart.totalCost,
  (bindings, papers, documents, totalCost) => ({
    bindings,
    papers,
    documents,
    totalCost,
  })
);

const AddOrder = () => {
  const dispatch = useThunkDispatch();
  const { bindings, papers, documents, totalCost } = useSelector(reduxProps);
  const [file, setFile] = useState<File>();
  const [numberOfCopies, setNumberOfCopies] = useState<number>(0);
  const [printOption, setPrintOption] = useState<string>('');
  const [paperOption, setPaperOption] = useState<string>('');
  const [bindingOption, setBindingOption] = useState<string>('');
  const [errors] = useState<Record<string, string>>({});

  const uploadFile = (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('print', printOption);
    data.append('paper', paperOption);
    data.append('copies', numberOfCopies.toString());
    data.append('binding', bindingOption);
    data.append('file', file as Blob);
    dispatch(uploadFileAction(data));
  };

  const deleteFiles = () => dispatch(clearCart);

  const deleteFile = (id: string) => dispatch(removeDocument(id));

  const addOrder = () => dispatch(postOrder('Personal'));

  useEffect(() => {
    dispatch(getPapersBindings);
    dispatch(getCart);
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
                // span={props.order.successMessage ? true : false}
              />
              <div className="row">
                <div className="col-sm-3 mb-3">
                  <InputWithLabel
                    label="Number of Copies"
                    placeholder="Number Of Copies"
                    type="number"
                    classes="form-control"
                    value={numberOfCopies}
                    onChange={setNumberOfCopies}
                    step="1"
                    min="1"
                    error={errors.numberOfCopies}
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
                    values={papers}
                    error={errors.paperOption}
                  />
                </div>
                <div className="col-sm-3 mb-3">
                  <Select
                    label="Binding Option"
                    value={bindingOption}
                    change={setBindingOption}
                    values={bindings}
                    error={errors.bindingOption}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={uploadFile}
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
                    // value={useFor}
                    // change={setUseFor}
                    // error={orderError}
                  />
                </div>
              </div>
              <button className="btn btn-primary" onClick={addOrder}>
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
