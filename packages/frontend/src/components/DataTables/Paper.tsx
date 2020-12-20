import { memo, FC, useEffect } from 'react';

// hooks
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

// components
import Alert from '@components/UI/Alert';
import Table from './index';

// types
import { PaperFront as Paper, UserRole } from '@job/common';
import { AppState } from '@reducers/index';

// actions
import {
  updatePaperBindingPrice,
  resetPaperBindingResponse,
  updatePaperBindingAvailability,
} from '@actions';

interface Props {
  role: UserRole;
  papers: Paper[];
}

type AvailabilityAction = (row: Paper) => () => void;

const buttonFormatter = (action: AvailabilityAction) => (
  _: undefined,
  row: Paper
) => (
  <button
    className={`btn btn-${row.available ? 'danger' : 'success'} padding`}
    type="button"
    data-toggle="tooltip"
    data-placment="top"
    title={`Make ${row.available ? 'Unavailable' : 'Available'} - ${row.name}`}
    onClick={action(row)}
  >
    <i className={row.available ? 'far fa-times-circle' : 'fa fa-check'} />
  </button>
);

const validator = (newValue: string) => {
  const value = parseFloat(newValue);
  if (Number.isNaN(value) || value <= 0 || !value) {
    return {
      valid: false,
      message: `Price should be a number and greater than 0`,
    };
  }
  return true;
};

const columns = (role: string, updateAvailability: AvailabilityAction) => [
  {
    dataField: 'name',
    text: 'Name',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    editable: false,
  },
  {
    dataField: 'blackWhitePrinting.upTo250',
    text: 'B/W 250',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'blackWhitePrinting.from250upTo500',
    text: 'B/W 250 - 500',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'blackWhitePrinting.from500upTo1000',
    text: 'B/W 500 - 1000',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'blackWhitePrinting.from1000',
    text: 'B/W 1000+',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'colorPrinting.upTo250',
    text: 'Color 250',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'colorPrinting.from250upTo500',
    text: 'Color 250 - 500',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'colorPrinting.from500upTo1000',
    text: 'Color 500 - 1000',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'colorPrinting.from1000',
    text: 'Color 1000+',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'actions',
    text: 'Actions',
    formatter:
      role === 'admin' || role === 'worker'
        ? buttonFormatter(updateAvailability)
        : null,
    align: 'center',
    headerAlign: 'center',
    csvExport: false,
    editable: false,
  },
];

const redux = createSelector(
  (state: AppState) => state.paperBinding.message,
  (state: AppState) => state.paperBinding.status,
  (message, status) => ({ message, status })
);

const PriceDataTable: FC<Props> = ({ role, papers }) => {
  const dispatch = useThunkDispatch();
  const { message, status } = useSelector(redux);

  const clearResponse = () => dispatch(resetPaperBindingResponse);

  const updateSinglePaper = (id: string, option: string, value: string) => {
    const val = parseFloat(value);
    clearResponse();
    dispatch(updatePaperBindingPrice('paper', { id, option, value: val }));
  };

  const updateAvailability = (row: Paper) => () => {
    clearResponse();
    dispatch(updatePaperBindingAvailability('paper', row._id, !row.available));
  };

  useEffect(() => {
    return () => {
      dispatch(resetPaperBindingResponse);
    };
  }, [dispatch]);

  return (
    <>
      {message && (
        <Alert
          message={message}
          clear={clearResponse}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <div className="DataTable big card-body col-12">
        <Table
          data={papers}
          columns={columns(role, updateAvailability)}
          onCellEdit={updateSinglePaper}
        />
      </div>
    </>
  );
};

export default memo(PriceDataTable);
