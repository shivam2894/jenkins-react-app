import {
  ADD_EXISTING_PRODUCT_TO_TRANSACTION,
  ADD_PRODUCT_TO_TRANSACTION_FAILURE,
  ADD_PRODUCT_TO_TRANSACTION_REQUEST,
  ADD_PRODUCT_TO_TRANSACTION_SUCCESS,
  CHANGE_END_DATE_FILTER,
  CHANGE_START_DATE_FILTER,
  CHANGE_STATUS_FILTER,
  CHANGE_TRANSACTION_PAGE,
  DELETE_TRANSACTION,
  FETCH_ALL_TRANSACTIONS_FAILURE,
  TRANSACTIONS_REQUEST,
  FETCH_ALL_TRANSACTIONS_SUCCESS,
  REMOVE_PRODUCT_FROM_TRANSACTION,
  RESET_TRANSACTION_FILTERS,
  RESET_PRODUCT_LIST,
} from "./transactionTypes";

import { toast } from "react-toastify";

const initialState = {
  err: "",
  productList: [],
  grandTotal: 0,
  transactions: [],
  nextExists: false,
  loading: false,
  currPage: 0,
  startDateFilter: "",
  endDateFilter: "",
  statusFilter: "",
};

const transactionReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_TO_TRANSACTION_REQUEST:
      return {
        ...state,
        err: null,
      };
    case ADD_PRODUCT_TO_TRANSACTION_SUCCESS:
      //check if product stock already 0
      if (action.payload.stocks === 0) {
        toast.error("Product is out of stock !!!");
        return state;
      }
      //add new product to list
      return {
        ...state,
        productList: [
          ...state.productList,
          {
            ...action.payload,
            quantity: 1,
            total: action.payload.price,
          },
        ],
        grandTotal: state.grandTotal + action.payload.price,
      };
    case ADD_EXISTING_PRODUCT_TO_TRANSACTION:
      //to add existing product: find that product from the list, then update its quantity and total & grand total
      return {
        ...state,
        productList: state.productList.map((product, idx) =>
          product.productName === action.payload.productName
            ? {
                ...product,
                quantity: product.quantity + 1,
                total: product.total + product.price,
              }
            : product
        ),
        grandTotal: state.grandTotal + action.payload.price,
      };
    case ADD_PRODUCT_TO_TRANSACTION_FAILURE:
      return {
        ...state,
        err: action.payload,
      };
    case REMOVE_PRODUCT_FROM_TRANSACTION:
      //to remove product from list: first find index of that product
      //if quantity of that product is 1, delete the product from the list & update grand total
      //else only reduce quantity and price & update grand total
      let idxToRemove = state.productList.findIndex(
        (product) => product.productName === action.payload
      );
      if (idxToRemove !== -1 && state.productList[idxToRemove].quantity === 1)
        return {
          ...state,
          grandTotal: state.grandTotal - state.productList[idxToRemove].price,
          productList: state.productList.filter(
            (product, idx) => idx !== idxToRemove
          ),
        };
      return {
        ...state,
        productList: state.productList.map((product, idx) =>
          product.productName === action.payload
            ? {
                ...product,
                quantity: product.quantity - 1,
                total: product.total - product.price,
              }
            : product
        ),
        grandTotal: state.grandTotal - state.productList[idxToRemove].price,
      };
    case RESET_PRODUCT_LIST:
      return { ...state, productList: [], grandTotal: 0 };
    case CHANGE_TRANSACTION_PAGE:
      return {
        ...state,
        currPage: action.payload,
      };
    case TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        transactions: [],
      };
    case FETCH_ALL_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        transactions: action.payload.transactions,
        nextExists: action.payload.nextExists,
      };
    case FETCH_ALL_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload,
        transactions: [],
        nextExists: false,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: [],
        loading: true,
      };
    case CHANGE_STATUS_FILTER:
      return {
        ...state,
        statusFilter: action.payload,
      };
    case CHANGE_START_DATE_FILTER:
      return {
        ...state,
        startDateFilter: action.payload,
      };
    case CHANGE_END_DATE_FILTER:
      return {
        ...state,
        endDateFilter: action.payload,
      };
    case RESET_TRANSACTION_FILTERS:
      return initialState;
    default:
      return state;
  }
};

export default transactionReducers;
