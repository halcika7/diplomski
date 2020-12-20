import { memo, FC, useEffect } from 'react';

// hooks
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

// components
import Alert from '@components/UI/Alert';
import Table from './index';

// types
import { BindingFront as Binding } from '@job/common';
import { AppState } from '@reducers/index';

// actions
import {
  updatePaperBindingPrice,
  resetPaperBindingResponse,
  updatePaperBindingAvailability,
} from '@actions';

type AvailabilityAction = (row: Binding) => () => void;

interface Props {
  bindings: Binding[];
}

const redux = createSelector(
  (state: AppState) => state.paperBinding.message,
  (state: AppState) => state.paperBinding.status,
  (message, status) => ({ message, status })
);

const buttonFormatter = (updateAvailability: AvailabilityAction) => (
  _: undefined,
  row: Binding
) => (
  <button
    className="btn btn-danger padding"
    type="button"
    data-toggle="tooltip"
    data-placment="top"
    title={`Make ${row.available ? 'Unavailable' : 'Available'} - ${row.name}`}
    onClick={updateAvailability(row)}
  >
    <i className={`far ${row.available ? 'fa-times-circle' : 'fa-check'}`} />
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

const columns = (updateAvailability: AvailabilityAction) => [
  {
    dataField: 'name',
    text: 'Name',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    editable: false,
  },
  {
    dataField: 'upTo25',
    text: '25 p',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'from25upTo50',
    text: '25 - 50',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'from50upTo100',
    text: '50 - 100',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'from100upTo150',
    text: '100 - 150',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator,
  },
  {
    dataField: 'actions',
    text: 'Actions',
    formatter: buttonFormatter(updateAvailability),
    align: 'center',
    headerAlign: 'center',
    csvExport: false,
    editable: false,
  },
];

const BindingDataTable: FC<Props> = ({ bindings }) => {
  const dispatch = useThunkDispatch();
  const { message, status } = useSelector(redux);

  const clearResponse = () => dispatch(resetPaperBindingResponse);

  const updateSinglePrice = (id: string, option: string, value: string) => {
    dispatch(
      updatePaperBindingPrice('binding', {
        id,
        option,
        value: parseFloat(value),
      })
    );
  };

  const updateAvailability = (row: Binding) => () => {
    clearResponse();
    dispatch(
      updatePaperBindingAvailability('binding', row._id, !row.available)
    );
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
      <div className="DataTable width card-body col-12">
        <Table
          data={bindings}
          columns={columns(updateAvailability)}
          onCellEdit={updateSinglePrice}
        />
      </div>
    </>
  );
};

export default memo(BindingDataTable);
