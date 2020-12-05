import { useThunkDispatch } from '@dispatch';
import React, { FC, useEffect } from 'react';

import Alert from '../../components/UI/Alert';

import { Binding } from 'src/redux/types/paperBinding';
import Table from './index';
import { updatePaperBindingPrice, resetPaperBindingResponse } from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';

interface Props {
  bindings: Binding[];
}

const redux = createSelector(
  (state: AppState) => state.paperBinding.message,
  (state: AppState) => state.paperBinding.status,
  (message, status) => ({ message, status })
);

const buttonFormatter = (_: any, row: Binding) => (
  <button
    className="btn btn-danger padding"
    type="button"
    data-toggle="tooltip"
    data-placment="top"
    title={`Make ${row.available ? 'Unavailable' : 'Available'} - ${row.name}`}
    // onClick={() =>
    //   props.updateBindingAvailable(row._id, false, props.history.push)
    // true
    // }
  >
    <i className={`far ${row.available ? 'fa-times-circle' : 'fa-check'}`} />
  </button>
);

const columns = [
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
    validator: (newValue: number | string) => {
      if (Number.isNaN(newValue) || newValue <= 0) {
        return {
          valid: false,
          message: 'Price should be numeric and greater than 0',
        };
      }
      return true;
    },
  },
  {
    dataField: 'from25upTo50',
    text: '25 - 50',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator: (newValue: number | string) => {
      if (Number.isNaN(newValue) || newValue <= 0) {
        return {
          valid: false,
          message: 'Price should be numeric and greater than 0',
        };
      }
      return true;
    },
  },
  {
    dataField: 'from50upTo100',
    text: '50 - 100',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator: (newValue: number | string) => {
      if (Number.isNaN(newValue) || newValue <= 0) {
        return {
          valid: false,
          message: 'Price should be numeric and greater than 0',
        };
      }
      return true;
    },
  },
  {
    dataField: 'from100upTo150',
    text: '100 - 150',
    align: 'center',
    headerAlign: 'center',
    sort: true,
    validator: (newValue: number | string) => {
      if (Number.isNaN(newValue) || newValue <= 0) {
        return {
          valid: false,
          message: 'Price should be numeric and greater than 0',
        };
      }
      return true;
    },
  },
  {
    dataField: 'actions',
    text: 'Actions',
    formatter: buttonFormatter,
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
          columns={columns}
          onCellEdit={updateSinglePrice}
        />
      </div>
    </>
  );
};

export default React.memo(BindingDataTable);
