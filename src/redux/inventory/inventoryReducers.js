import {
  CHANGE_PAGE,
  CHANGE_STOCK_FILTER,
  EDIT_PRODUCT_CLOSE,
  EDIT_PRODUCT_OPEN,
  GET_ALL_CATEGORIES_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_STOCK_SUMMARY_SUCCESS,
  INVENTORY_FAILURE,
  INVENTORY_REQUEST,
  RESET_INVENTORY_FILTERS,
  SEARCH_BY_PRODUCT_ID,
  SEARCH_BY_PRODUCT_NAME,
} from "./inventoryTypes";

const initialState = {
  products: [],
  numberOfElements: 0,
  nextExists: false,
  currPage: 0,
  categories: [],
  productToEdit: {
    id: "",
    productName: "",
    stocks: "",
    unit: "",
    price: "",
    minStock: "",
    maxStock: "",
    categoryName: "",
  },
  stockSummary: {
    stockValue: "",
    lowStock: "-",
    excessStock: "-",
    totalProducts: 0,
  },
  isEdit: false,
  stockFilter: "none",
};

const inventoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        currPage: action.payload,
      };
    case INVENTORY_REQUEST:
      return {
        ...state,
        res: null,
        products: [],
        categories: [],
        loading: true,
      };
    case INVENTORY_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        numberOfElements: action.payload.numberOfElements,
        nextExists: action.payload.nextExists
      };
    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        err: action.payload,
        products: [],
        numberOfElements: 0,
        nextExists: false
      };
    case EDIT_PRODUCT_OPEN:
      return {
        ...state,
        productToEdit: action.payload,
        isEdit: true,
      };
    case EDIT_PRODUCT_CLOSE:
      return {
        ...state,
        productToEdit: initialState.productToEdit,
        isEdit: false,
      };
    case GET_STOCK_SUMMARY_SUCCESS:
      return {
        ...state,
        stockSummary: action.payload,
      };
    case CHANGE_STOCK_FILTER:
      return {
        ...state,
        stockFilter: action.payload,
      };
    case SEARCH_BY_PRODUCT_ID:
      return {
        ...state,
        loading: false,
        products: [action.payload],
        numberOfElements: 1,
        nextExists: false
      };
    case SEARCH_BY_PRODUCT_NAME:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        numberOfElements: action.payload.numberOfElements,
        nextExists: action.payload.nextExists
      };
    case RESET_INVENTORY_FILTERS:
      return {
        ...state,
        currPage: 0,
        stockFilter: "none",
      };
    default:
      return state;
  }
};

export default inventoryReducers;
