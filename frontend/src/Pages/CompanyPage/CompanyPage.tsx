import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { getCompanyProfile, getQuote } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";
import CompFinder from "../../Components/CompFinder/CompFinder";
import TenKFinder from "../../Components/TenKFinder/TenKFinder";

const CompanyPage = () => {
  const { ticker } = useParams();

  const [company, setCompany] = useState<any>();
  const [quote, setQuote] = useState<any>();

  useEffect(() => {
    if (!ticker) return;

    const load = async () => {
      const profile = await getCompanyProfile(ticker);
      const quoteData = await getQuote(ticker);

      setCompany(profile);
      setQuote(quoteData);
    };

    load();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div className="w-full relative flex overflow-x-hidden">
          <Sidebar />

          <div className="relative md:ml-64 w-full p-6">
            <div className="flex flex-wrap">
              <Tile title="Company Name" subTitle={company.name || "N/A"} />
              <Tile title="Ticker" subTitle={company.ticker || "N/A"} />
              <Tile title="Exchange" subTitle={company.exchange || "N/A"} />
              <Tile
                title="Market Cap"
                subTitle={
                  company.marketCapitalization
                    ? company.marketCapitalization.toString()
                    : "N/A"
                }
              />

              {/* ✅ NOVOS TILES (Finnhub quote) */}
              <Tile
                title="Price"
                subTitle={quote ? "$" + quote.c : "N/A"}
              />
              <Tile
                title="High"
                subTitle={quote ? "$" + quote.h : "N/A"}
              />
              <Tile
                title="Low"
                subTitle={quote ? "$" + quote.l : "N/A"}
              />
            </div>

            <CompFinder ticker={company.ticker} />
            <TenKFinder ticker={company.ticker} />

            {/* descrição (Finnhub nem sempre tem) */}
            <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
              {company.finnhubIndustry || "No description available"}
            </p>

            <Outlet context={ticker} />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CompanyPage;