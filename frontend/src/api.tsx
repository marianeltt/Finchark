import axios from "axios";
import {
  CompanyKeyMetrics,
  CompanyBalanceSheet,
  CompanyProfile,
  CompanySearch,
  CompanyIncomeStatement,
} from "./company";

export interface SearchResponse {
  data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.result;
  } catch (error: any) {
    console.log("error message: ", error?.message);
    return [];
  }
};

export const getCompanyProfile = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data;
  } catch (error: any) {
    console.log("error message: ", error.message);
    return null;
  }
};
export const getKeyMetrics = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.metric;
  } catch (error: any) {
    console.log("error message: ", error.message);
    return null;
  }
};

export const getIncomeStatement = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/financials-reported?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.data;
  } catch (error: any) {
    console.log("error message: ", error.message);
    return null;
  }
};

export const getBalanceSheet = async (symbol: string) => {
  try {
    const res = await axios.get(
      `https://finnhub.io/api/v1/stock/financials-reported?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`
    );

    return res.data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const getCashFlow = async (symbol: string) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/financials-reported?symbol=${symbol}&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.data;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};