import { ChangeEvent, SyntheticEvent, useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";
import { searchCompanies } from "./api";
import { CompanySearch } from "./company";
import ListPortfolio from "./Components/Portfolio/ListPortfolio/ListPortfolio";
import Hero from "./Components/Hero/Hero";
import Navbar from "./Components/Navbar/Navbar";
import { Outlet } from "react-router";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";

function App() {
  return (
    <>
        <UserProvider>
            <Navbar />
            <Outlet />
            <ToastContainer />
        </UserProvider>
    </>
  );
}

export default App;