import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getCompanyProfile } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatLargeNonMonetaryNumber,
} from "../../Helpers/NumberFormatting";

type Props = {};

const tableConfig = [
  {
    label: "Company Name",
    render: (company: any) => company.name,
    subTitle: "Company name",
  },
  {
    label: "Ticker",
    render: (company: any) => company.ticker,
    subTitle: "Stock symbol",
  },
  {
    label: "Exchange",
    render: (company: any) => company.exchange,
    subTitle: "Stock exchange",
  },
  {
    label: "Market Cap",
    render: (company: any) =>
      formatLargeMonetaryNumber(company.marketCapitalization),
    subTitle: "Total company value",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<any>();

  useEffect(() => {
    const load = async () => {
      const result = await getCompanyProfile(ticker);
      setCompanyData(result);
    };

    load();
  }, [ticker]);

  return (
    <>
      {companyData ? (
        <RatioList config={tableConfig} data={companyData} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;