import React, { useEffect, useState } from "react";
import { CompanySearch } from "../../company";
import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../../api";

interface Props {}

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanySearch>();

  useEffect(() => {
    if (!ticker) return;

    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker as string);
      setCompany(result?.[0]);
    };

    getProfileInit();
  }, [ticker]);

  return (
    <>
      {company ? (
        <div className="company-profile-container">
          {company.name}
        </div>
      ) : (
        <div>Company Not Found!</div>
      )}
    </>
  );
};

export default CompanyPage;