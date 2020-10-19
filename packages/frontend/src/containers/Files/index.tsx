import { useThunkDispatch } from '@dispatch';
import React, { useEffect } from 'react';
import { getFiles } from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import FilesTable from '@components/DataTables/File';
import { Helmet } from 'react-helmet';

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  (state: AppState) => state.file.files,
  (role, files) => ({ role, files })
);

const Files = () => {
  const dispatch = useThunkDispatch();
  const { role, files } = useSelector(reduxProps);

  useEffect(() => {
    dispatch(getFiles);
  }, [dispatch]);

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
          <FilesTable role={role as string} files={files} />
        </div>
      </div>
    </>
  );
};

export default Files;
