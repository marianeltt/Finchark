import axios from "axios";
import { CompanySearch } from "./company";

    export interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const response = await axios.get<SearchResponse>(
            `https://api.twelvedata.com/symbol_search?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return response.data.data;
    } catch (error: any) {
        console.log("error message: ", error?.message);
        return error?.message || "Erro inesperado";
    }
};