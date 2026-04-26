import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../Table/Table";
import { CompanyIncomeStatement } from "../../company";
import { getIncomeStatement } from "../../api";
import Spinner from "../Spinner/Spinner";

type Props = {};

const getValue = (report: any, concepts: string[]) => {
  const data = report?.ic || report?.incomeStatement || report?.bs || [];

  for (const concept of concepts) {
    const found = data.find((x: any) => x.concept === concept);
    if (found) return found.value;
  }

  return 0;
};

const configs = [
  {
    label: "Year",
    render: (company: CompanyIncomeStatement) => company.year,
  },
  {
    label: "Total Revenue",
    render: (company: CompanyIncomeStatement) => company.revenue,
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => company.netIncome,
  },
  {
    label: "Operating Expenses",
    render: (company: CompanyIncomeStatement) => company.operatingExpenses,
  },
  {
    label: "Cost And Expenses",
    render: (company: CompanyIncomeStatement) => company.costAndExpenses,
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();

  const [incomeStatement, setIncomeStatement] =
    useState<CompanyIncomeStatement[]>();

  useEffect(() => {
    const load = async () => {
      const result = await getIncomeStatement(ticker!);

      console.log("RAW DATA:", result);

      const formatted: CompanyIncomeStatement[] = result.map((item: any) => {
        const report = item.report;

        return {
          year: item.year,

          revenue: getValue(report, [
            "us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax",
            "us-gaap_Revenues",
            "us-gaap_SalesRevenueNet",
          ]),

          netIncome: getValue(report, [
            "us-gaap_NetIncomeLoss",
          ]),

          operatingExpenses: getValue(report, [
            "us-gaap_OperatingExpenses",
          ]),

          costAndExpenses: getValue(report, [
            "us-gaap_CostOfRevenue",
            "us-gaap_CostOfGoodsAndServicesSold",
          ]),
        };
      });

      console.log("FORMATTED DATA:", formatted);

      setIncomeStatement(formatted);
    };

    load();
  }, [ticker]);

  return (
    <>
      {incomeStatement ? (
        <Table config={configs} data={incomeStatement} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default IncomeStatement;