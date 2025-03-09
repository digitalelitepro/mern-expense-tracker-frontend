export const BASE_URL = "http://localhost:8000";

// utils/apiPath.js

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/profile",
  },
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard/access",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/incomes/add",
    GET_ALL_INCOME: "/api/v1/incomes/get",
    DELETE_INCOME: (incomeId) => `/api/v1/incomes/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/incomes/download-excel`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expenses/add",
    GET_ALL_EXPENSE: "/api/v1/expenses/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expenses/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expenses/download-excel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
