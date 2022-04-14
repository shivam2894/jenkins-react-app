import { toast } from "react-toastify";
import { getAuthenticatedRequest } from "..";
import {
  ADD_EXISTING_PRODUCT_TO_TRANSACTION,
  ADD_PRODUCT_TO_TRANSACTION_FAILURE,
  ADD_PRODUCT_TO_TRANSACTION_REQUEST,
  ADD_PRODUCT_TO_TRANSACTION_SUCCESS,
  CHANGE_END_DATE_FILTER,
  CHANGE_START_DATE_FILTER,
  CHANGE_STATUS_FILTER,
  CHANGE_TRANSACTION_PAGE,
  FETCH_ALL_TRANSACTIONS_FAILURE,
  TRANSACTIONS_REQUEST,
  FETCH_ALL_TRANSACTIONS_SUCCESS,
  REMOVE_PRODUCT_FROM_TRANSACTION,
  RESET_TRANSACTION_FILTERS,
  RESET_PRODUCT_LIST,
} from "./transactionTypes";

export const addProductToTransaction = (productName) => {
  return (dispatch) => {
    dispatch({ type: ADD_PRODUCT_TO_TRANSACTION_REQUEST });
    getAuthenticatedRequest()
      .get(`/products/singleproduct/${productName}`)
      .then((res) =>
        dispatch({
          type: ADD_PRODUCT_TO_TRANSACTION_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch({
          type: ADD_PRODUCT_TO_TRANSACTION_FAILURE,
          payload: err.response.data,
        })
      );
  };
};

export const removeProductFromTransaction = (productName) => {
  return {
    type: REMOVE_PRODUCT_FROM_TRANSACTION,
    payload: productName,
  };
};

export const createTransaction = (transaction) => {
  return (dispatch) => {
    getAuthenticatedRequest()
      .post("/transactions/createTran", transaction)
      .then(() =>{
        dispatch(fetchAllTransactions());
        toast.success("Successfully added transaction");
      }
      )
      .catch(() => {
        toast.error("Failed to add transaction");
        dispatch(fetchAllTransactions());
      });
  };
};

export const resetProductList = () => {
  return {
    type: RESET_PRODUCT_LIST,
  };
};

export const addExistingProductToTransaction = (product) => {
  return {
    type: ADD_EXISTING_PRODUCT_TO_TRANSACTION,
    payload: product,
  };
};

export const changeTransactionPage = (pageNo) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_TRANSACTION_PAGE, payload: pageNo });
    dispatch(fetchAllTransactions());
  };
};

export const fetchAllTransactions = () => {
  return (dispatch, getState) => {
    const transaction = getState().transaction;
    dispatch({ type: TRANSACTIONS_REQUEST });
    getAuthenticatedRequest()
      .post(`/transactions/page/${transaction.currPage}`, {
        start: transaction.startDateFilter,
        end: transaction.endDateFilter,
        status:
          transaction.statusFilter && transaction.statusFilter !== "ALL"
            ? [transaction.statusFilter]
            : null,
      })
      .then((res) =>
        dispatch({ type: FETCH_ALL_TRANSACTIONS_SUCCESS, payload: res.data })
      )
      .catch((err) =>
        dispatch({
          type: FETCH_ALL_TRANSACTIONS_FAILURE,
          err: err.response.data,
        })
      );
  };
};

export const deleteTransaction = (txId) => {
  return (dispatch) => {
    dispatch({ type: TRANSACTIONS_REQUEST });
    getAuthenticatedRequest()
      .delete(`/transactions/delete/${txId}`)
      .then(() => dispatch(fetchAllTransactions()))
      .catch(() => {
        toast.error("Failed to delete transaction");
        dispatch(fetchAllTransactions());
      });
  };
};

export const changeStartDateFilter = (filter) => {
  return {
    type: CHANGE_START_DATE_FILTER,
    payload: filter,
  };
};

export const changeEndDateFilter = (filter) => {
  return {
    type: CHANGE_END_DATE_FILTER,
    payload: filter,
  };
};

export const changeStatusFilter = (filter) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS_FILTER, payload: filter });
    dispatch(changeTransactionPage(0));
  };
};

export const resetTransactionFilters = () => {
  return (dispatch) => {
    dispatch({ type: RESET_TRANSACTION_FILTERS });
    dispatch(fetchAllTransactions());
  };
};

export const updateTransactionStatus = (txId, status) => {
  return (dispatch) => {
    dispatch({ type: TRANSACTIONS_REQUEST });
    getAuthenticatedRequest()
      .patch(`/transactions/update/${txId}`, null, {
        params: {
          status: status,
        },
      })
      .then(() =>
        dispatch(fetchAllTransactions())
      )
      .catch((err) =>
        dispatch({
          type: FETCH_ALL_TRANSACTIONS_FAILURE,
          payload: err.response.data.error,
        })
      );
  };
};
