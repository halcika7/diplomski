import { mount } from 'enzyme';
import PageNotFound from '@containers/PageNotFound';
import { BrowserRouter } from 'react-router-dom';

describe('Testing Login index', () => {
  it('should render Login container', () => {
    const comp = mount(
      <BrowserRouter>
        <PageNotFound dashboard={false} />
      </BrowserRouter>
    );

    comp.unmount();
  });

  it('should render Login container', () => {
    const comp = mount(
      <BrowserRouter>
        <PageNotFound />
      </BrowserRouter>
    );

    comp.unmount();
  });
});
