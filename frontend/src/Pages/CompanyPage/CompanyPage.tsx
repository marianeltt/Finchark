import React, { useEffect, useState } from "react";
import { useParams, Outlet } from "react-router-dom";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";

const CompanyPage = () => {
  const { ticker } = useParams();
  const [company, setCompany] = useState<any>();

  useEffect(() => {
    if (!ticker) return;

    const load = async () => {
      const result = await getCompanyProfile(ticker);
      setCompany(result);
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
                subTitle={company.marketCapitalization?.toString() || "N/A"}
              />
            </div>

            {/* 🔥 ESSENCIAL */}
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