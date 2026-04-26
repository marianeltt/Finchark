import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

const getValue = (report: any, concepts: string[]) => {
  const data = report?.bs || [];

  for (const concept of concepts) {
    const found = data.find((x: any) => x.concept === concept);
    if (found) return found.value;
  }

  return 0;
};

const BalanceSheet = () => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBalanceSheet(ticker!);
      setCompanyData(result?.data?.[0]?.report);
    };

    fetchData();
  }, [ticker]);

  if (!companyData) return <Spinner />;

  const config = [
    {
      label: "Cash",
      render: () =>
        formatLargeMonetaryNumber(
          getValue(companyData, [
            "us-gaap_CashAndCashEquivalentsAtCarryingValue",
          ])
        ),
    },
    {
      label: "Inventory",
      render: () =>
        formatLargeMonetaryNumber(
          getValue(companyData, ["us-gaap_InventoryNet"])
        ),
    },
    {
      label: "Total Assets",
      render: () =>
        formatLargeMonetaryNumber(
          getValue(companyData, ["us-gaap_Assets"])
        ),
    },
    {
      label: "Total Liabilities",
      render: () =>
        formatLargeMonetaryNumber(
          getValue(companyData, ["us-gaap_Liabilities"])
        ),
    },
    {
      label: "Retained Earnings",
      render: () =>
        formatLargeMonetaryNumber(
          getValue(companyData, [
            "us-gaap_RetainedEarningsAccumulatedDeficit",
          ])
        ),
    },
  ];

  return <RatioList config={config} data={companyData} />;
};

export default BalanceSheet;