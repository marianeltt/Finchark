import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTable, FaMoneyBill } from "react-icons/fa";
import { FaTableCells } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <nav className="block py-4 px-6 top-0 bottom-0 w-64 bg-white shadow-xl left-0 absolute md:z-10 transform md:translate-x-0 -translate-x-full">
      <div className="flex flex-col w-full mt-4">

        <Link to="company-profile" className="flex items-center text-xs font-bold pt-2 pb-4">
          {React.createElement(FaHome as React.ElementType)}
          <span className="ml-3">Company Profile</span>
        </Link>

        <Link to="income-statement" className="flex items-center text-xs font-bold pt-2 pb-4">
          {React.createElement(FaTable as React.ElementType)}
          <span className="ml-3">Income Statement</span>
        </Link>

        <Link to="balance-sheet" className="flex items-center text-xs font-bold pt-2 pb-4">
          {React.createElement(FaTableCells as React.ElementType)}
          <span className="ml-3">Balance Sheet</span>
        </Link>

        <Link to="cashflow-statement" className="flex items-center text-xs font-bold pt-2 pb-4">
          {React.createElement(FaMoneyBill as React.ElementType)}
          <span className="ml-3">Cashflow Statement</span>
        </Link>

      </div>
    </nav>
  );
};

export default Sidebar;