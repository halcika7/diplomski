import { memo, useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Cards from './Cards';
import WhyChooseUs from './WhyChooseUs';
import AboutUs from './AboutUs';
import Services from './Services';
import Printing from './Printing';
import Footer from './Footer';
import { useThunkDispatch } from '@dispatch';
import { authSuccess, getUserData } from '@actions';
import Carousel from '@components/UI/Carousel';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Alert from '@components/UI/Alert';

const reduxProps = createSelector(
  (state: AppState) => state.auth.isAuthenticated,
  isAuthenticated => ({ isAuthenticated })
);

const Login = () => {
  const location = useLocation();
  const dispatch = useThunkDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector(reduxProps);
  const [err, setError] = useState<string>('');
  const token = new URLSearchParams(location.search).get('token');
  const error = new URLSearchParams(location.search).get('err');

  const clear = () => setError('');

  useEffect(() => {
    if (token) {
      dispatch(getUserData);
      dispatch(authSuccess(token));
      history.replace('/dashboard');
    }
    if (error) {
      setError(error);
      history.replace('/');
    }
  }, [error, token, dispatch, history]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [history, isAuthenticated]);

  if (isAuthenticated) return <Redirect to="/dashboard" />;

  return (
    <div className="homepage">
      <Navbar />
      {err && <Alert message={err} className="alert-danger" clear={clear} />}
      <Carousel />
      <AboutUs />
      <Cards />
      <div className="z-depth-4">
        <WhyChooseUs />
        <Services />
      </div>
      <Printing />
      <Footer />
    </div>
  );
};

export default memo(Login);
