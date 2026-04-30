import axios from "axios";
import { PortfolioGet, PortfolioPost } from "../Models/Portfolio";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5037/api/portfolio/";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const portfolioAddAPI = async (symbol: string) => {
    try {
        const data = await axios.post<PortfolioPost>(
            api + `?symbol=${symbol}`,
            {}, // body vazio (evita erro)
            getAuthHeader()
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioDeleteAPI = async (symbol: string) => {
    try {
        const data = await axios.delete<PortfolioPost>(
            api + `?symbol=${symbol}`,
            getAuthHeader()
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const portfolioGetAPI = async () => {
    try {
        const data = await axios.get<PortfolioGet[]>(
            api,
            getAuthHeader()
        );
        return data;
    } catch (error) {
        handleError(error);
    }
};