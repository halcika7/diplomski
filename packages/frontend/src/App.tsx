import { useEffect } from 'react';
import { getCSRF, refreshToken } from '@actions';

import './App.css';
import Routes from './routes/index';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Spinner from '@components/UI/Spinner/Spinner';
import { useThunkDispatch } from '@dispatch';

const reduxProps = createSelector(
  (state: AppState) => state.auth.authLoading,
  loading => ({ loading })
);

function App() {
  const dispatch = useThunkDispatch();
  const { loading } = useSelector(reduxProps);

  useEffect(() => {
    dispatch(getCSRF);
    dispatch(refreshToken(true));
  }, [dispatch]);

  if (loading) return <Spinner />;

  return (
    <div className="wrapper">
      <Routes />
    </div>
  );
}

export default App;
