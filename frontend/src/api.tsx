import axios from "axios";

export const searchCompanies = async (query: string) => {
  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`
    );

    return response.data.result; // <-- importante
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