import { useThunkDispatch } from '@dispatch';
import React, { useEffect } from 'react';
import { getFiles } from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import FilesTable from '@components/DataTables/File';
import { Helmet } from 'react-helmet';
import Spinner from '@components/UI/Spinner/Spinner';

const reduxProps = createSelector(
  (state: AppState) => state.file.files,
  (files) => ({ files })
);

const Files = () => {
  const dispatch = useThunkDispatch();
  const { files } = useSelector(reduxProps);

  useEffect(() => {
    dispatch(getFiles);
  }, [dispatch]);

  if (!files)
    return (
      <div className="card-body">
        <Spinner />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Files Table</title>
        <meta name="description" content="Files Table page in Print shop app" />
        <meta
          property="og:description"
          content="Files Table page in Print shop app"
        />
      </Helmet>
      <div className="row">
        <div className="col-12 card">
          <div className="card-header">
            <h2 className="title">Files</h2>
          </div>
          <FilesTable files={files} />
        </div>
      </div>
    </>
  );
};

export default Files;
