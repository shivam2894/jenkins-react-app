import { toast } from "react-toastify";
import { getAuthenticatedRequest } from "..";
import {
  CHANGE_PAGE,
  INVENTORY_REQUEST,
  EDIT_PRODUCT_OPEN,
  EDIT_PRODUCT_CLOSE,
  INVENTORY_FAILURE,
  GET_ALL_CATEGORIES_SUCCESS,
  CHANGE_STOCK_FILTER,
  GET_STOCK_SUMMARY_SUCCESS,
  SEARCH_BY_PRODUCT_ID,
  SEARCH_BY_PRODUCT_NAME,
  RESET_INVENTORY_FILTERS,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
} from "./inventoryTypes";

export const changePage = (pageNo) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: pageNo });
    dispatch(fetchAllProducts());
  };
};

export const fetchAllProducts = () => {
  return (dispatch, getState) => {
    const inventory = getState().inventory;
    dispatch({ type: INVENTORY_REQUEST });
    getAuthenticatedRequest()
      .get(
        `/products/page/${inventory.currPage}/filter/${inventory.stockFilter}`
      )
      .then((res) => {
        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: res.data });
      })
      .catch((err) =>
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: err.response })
      );
  };
};

export const addProduct = (product) => {
  return (dispatch, getState) => {
    dispatch({ type: INVENTORY_REQUEST });
    getAuthenticatedRequest()
      .post("/products/add", product)
      .then(() => {
        dispatch(getStockSummary());
        dispatch(fetchAllProducts());
        toast.success(`Added Product ${product.productName} successfully`);
      })
      .catch((err) => {
        dispatch({ type: INVENTORY_FAILURE, payload: err.response });
        toast.error("Failed to add product");
      });
  };
};

export const getAllCategories = () => {
  return (dispatch) => {
    getAuthenticatedRequest()
      .get("/products/categories")
      .then((res) =>
        dispatch({ type: GET_ALL_CATEGORIES_SUCCESS, payload: res.data })
      )
      .catch((err) =>
        dispatch({ type: INVENTORY_FAILURE, payload: err.response })
      );
  };
};

export const editProductOpen = (product) => {
  return {
    type: EDIT_PRODUCT_OPEN,
    payload: product,
  };
};

export const editProductClose = () => {
  return {
    type: EDIT_PRODUCT_CLOSE,
  };
};

export const editProduct = (product) => {
  return (dispatch) => {
    dispatch({ type: INVENTORY_REQUEST });
    getAuthenticatedRequest()
      .patch(`/products/edit/${product.id}`, {
        id: product.id,
        productName: product.productName,
        categoryName: product.categoryName,
        stocks: product.stocks,
        minStock: product.minStock,
        maxStock: product.maxStock,
        unit: product.unit,
        price: product.price,
      })
      .then(() => {
        dispatch(getStockSummary());
        dispatch(fetchAllProducts());
        dispatch(editProductClose());
        toast.success("Edited Product successfully");
      })
      .catch((err) => {
        dispatch({ type: INVENTORY_FAILURE, payload: err.response });
        toast.error(`Edited Product ${product.productName} successfully`);
      });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    dispatch({ type: INVENTORY_REQUEST });
    getAuthenticatedRequest()
      .delete(`/products/delete/${id}`)
      .then(() => {
        dispatch(fetchAllProducts());
        dispatch(getStockSummary());
      })
      .catch((err) =>
        dispatch({ type: INVENTORY_FAILURE, payload: err.response })
      );
  };
};

export const uploadProducts = (products) => {
  return (dispatch) => {
    dispatch({ type: INVENTORY_REQUEST });
    getAuthenticatedRequest()
      .post("/products/upload", products)
      .then(() => {
        dispatch(getStockSummary());
        dispatch(fetchAllProducts());
        toast.success("Added products to your inventory");
      })
      .catch((err) => {
        dispatch({ type: INVENTORY_FAILURE, payload: err.response });
        toast.error(
          "Failed to add products to your inventory. Please make sure you are not entering duplicate products."
        );
        dispatch(fetchAllProducts());
      });
  };
};

export const getStockSummary = () => {
  return (dispatch) => {
    getAuthenticatedRequest()
      .get("/products/stocksummary")
      .then((res) =>
        dispatch({ type: GET_STOCK_SUMMARY_SUCCESS, payload: res.data })
      )
      .catch((err) =>
        dispatch({ type: INVENTORY_FAILURE, payload: err.response })
      );
  };
};

export const changeStockFilter = (filter) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_STOCK_FILTER, payload: filter });
    dispatch(changePage(0));
  };
};

export const searchByProductId = (id) => {
  return (dispatch) => {
    dispatch({ type: INVENTORY_REQUEST });
    getAuthenticatedRequest()
      .get(`/products/${id}`)
      .then((res) => {
        dispatch({ type: SEARCH_BY_PRODUCT_ID, payload: res.data });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        dispatch({ type: INVENTORY_FAILURE, payload: err.response });
        dispatch(fetchAllProducts());
      });
  };
};

export const searchByProductName = (name) => {
  return (dispatch, getState) => {
    dispatch({ type: INVENTORY_REQUEST });
    getAuthenticatedRequest()
      .get(`/products/name/${name}/${getState().inventory.currPage}`)
      .then((res) => {
        if (res.data.products.length === 0) {
          toast.error(`Product ${name} not found`);
          dispatch(fetchAllProducts());
        } else dispatch({ type: SEARCH_BY_PRODUCT_NAME, payload: res.data });
      })
      .catch((err) =>
        dispatch({ type: INVENTORY_FAILURE, payload: err.response })
      );
  };
};

export const resetInventoryFilters = () => {
  return (dispatch) => {
    dispatch({ type: RESET_INVENTORY_FILTERS });
    dispatch(fetchAllProducts());
  };
};
