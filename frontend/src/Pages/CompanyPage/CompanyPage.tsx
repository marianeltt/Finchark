import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../../api";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Tile from "../../Components/Tile/Tile";

const CompanyPage = () => {
  let { ticker } = useParams();

  const tabItems = [
    { id: 1, title: "Company Profile", icon: "fas fa-child", content: "step 1 content" },
    { id: 2, title: "Income Statement", icon: "fas fa-users", content: "step 2 content" },
    { id: 3, title: "Balance Sheet", icon: "fas fa-network-wired", content: "step 3 content" },
    { id: 4, title: "Cash Flow", icon: "fa money-check-alt", content: "step 4 content" },
  ];

  const [company, setCompany] = useState<any>();
  const [activeSidebarItem, setActiveSideBarItem] = useState<number>(1);

  useEffect(() => {
    if (!ticker) return;

    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker as string);
      setCompany(result);
    };

    getProfileInit();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div className="w-full relative flex overflow-x-hidden">
          
          {/* SIDEBAR */}
          <Sidebar
            tabItems={tabItems}
            setActiveSideBarItem={setActiveSideBarItem}
            activeSidebarItem={activeSidebarItem}
          />

          {/* DASHBOARD */}
          <CompanyDashboard
            tabItems={tabItems}
            activeSidebarItem={activeSidebarItem}
          >
            <Tile title="Company Name" subTitle={company.name || "N/A"} />
            <Tile title="Ticker" subTitle={company.ticker || "N/A"} />
            <Tile title="Exchange" subTitle={company.exchange || "N/A"} />
            <Tile
              title="Market Cap"
              subTitle={company.marketCapitalization?.toString() || "N/A"}
            />
          </CompanyDashboard>
        </div>
      ) : (
        <div>Company Not Found!</div>
      )}
    </>
  );
};

export default CompanyPage;