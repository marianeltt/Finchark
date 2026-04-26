import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyKeyMetrics } from "../../company";
import { getKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Tile from "../Tile/Tile";

type Props = {};

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCapitalization,
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioAnnual,
    subTitle:
      "Measures the company's ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => company.roeTTM,
    subTitle: "Measures profitability relative to shareholder equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) => company.roaTTM,
    subTitle: "Measures how efficiently a company uses its assets",
  },
  {
    label: "Cash Flow Per Share",
    render: (company: CompanyKeyMetrics) => company.cashFlowPerShareTTM,
    subTitle: "Cash generated per share of stock",
  },
  {
    label: "Book Value Per Share",
    render: (company: CompanyKeyMetrics) =>
      company.bookValuePerShareAnnual,
    subTitle: "Net asset value per share",
  },
];

const CompanyProfile = (props: Props) => {
    const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getCompanyKeyRatios = async () => {
      const value = await getKeyMetrics(ticker);

    console.log("COMPANY DATA:", value);

      setCompanyData(value);
    };
    getCompanyKeyRatios();
  }, []);
  return (
    <>
      {companyData ? (
        <>
          <RatioList config={tableConfig} data={companyData} />
        </>
      ) : (
        <h1>No data found</h1>
      )}
    </>
  );
};

export default CompanyProfile;