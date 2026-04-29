import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import CompanyPage from "../Pages/CompanyPage/CompanyPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DesignGuide from "../Pages/DesegnGuide/DesegnGuide";
import CompanyProfile from "../Components/CompanyProfile/CompanyProfile";
import IncomeStatement from "../Components/IncomeStatement/IncomeStatement";
import BalanceSheet from "../Components/BalanceSheet/BalanceSheet";
import CashflowStatement from "../Components/CashflowStatement/CashflowStatement";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "design-guide", element: <DesignGuide /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "search",
        element: (
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
        ),
      },

      {
        path: "company/:ticker",
        element: (
            <ProtectedRoute>
              <CompanyPage />
            </ProtectedRoute>
        ),
        children: [
          { path: "company-profile", element: <CompanyProfile /> },
          { path: "income-statement", element: <IncomeStatement /> },
          { path: "balance-sheet", element: <BalanceSheet /> },
          { path: "cashflow-statement", element: <CashflowStatement /> },
        ],
      },
    ],
  },
]);