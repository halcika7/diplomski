import React, { FC, useEffect } from 'react';

import Alert from '../../components/UI/Alert';
import { Paper } from 'src/redux/types/paperBinding';
import Table from './index';
import {
  updatePaperBindingPrice,
  resetPaperBindingResponse,
  updatePaperBindingAvailability,
} from '@actions';
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';

interface Props {
  role: string;
  papers: Paper[];
}

type AvailabilityAction = (row: Paper) => () => void;

const buttonFormatter = (action: AvailabilityAction) => (
  _: any,
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
    dataField: 'blackWhitePrinting.from250upTo500',
    text: 'B/W 250 - 500',
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
    dataField: 'blackWhitePrinting.from500upTo1000',
    text: 'B/W 500 - 1000',
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
    dataField: 'blackWhitePrinting.from1000',
    text: 'B/W 1000+',
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
    dataField: 'colorPrinting.upTo250',
    text: 'Color 250',
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
    dataField: 'colorPrinting.from250upTo500',
    text: 'Color 250 - 500',
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
    dataField: 'colorPrinting.from500upTo1000',
    text: 'Color 500 - 1000',
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
    dataField: 'colorPrinting.from1000',
    text: 'Color 1000+',
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
    clearResponse();
    dispatch(
      updatePaperBindingPrice('paper', { id, option, value: parseFloat(value) })
    );
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

export default React.memo(PriceDataTable);
