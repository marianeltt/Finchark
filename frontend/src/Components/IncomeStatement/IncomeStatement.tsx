import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Table from "../Table/Table";
import { CompanyIncomeStatement } from "../../company";
import { getIncomeStatement } from "../../api";
import Spinner from "../Spinner/Spinner";
import {
  formatLargeMonetaryNumber,
  formatRatio,
} from "../../Helpers/NumberFormatting";

type Props = {};

const getValue = (report: any, concepts: string[]) => {
  const data = report?.ic || [];

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
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Operating Expenses",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.operatingExpenses),
  },
  {
    label: "Cost And Expenses",
    render: (company: CompanyIncomeStatement) =>
      formatLargeMonetaryNumber(company.costAndExpenses),
  },
  {
    label: "Gross Margin",
    render: (company: CompanyIncomeStatement) =>
      company.revenue > 0 && company.grossProfit > 0
        ? formatRatio(company.grossProfit / company.revenue)
        : "N/A",
  },
];

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] =
    useState<CompanyIncomeStatement[]>();

  useEffect(() => {
    const load = async () => {
      const result = await getIncomeStatement(ticker!);

      if (!result || result.length === 0) return;

      const formatted: CompanyIncomeStatement[] = result.map(
        (item: any) => {
          const report = item.report;

          const revenue = getValue(report, [
            "us-gaap_RevenueFromContractWithCustomerExcludingAssessedTax",
            "us-gaap_Revenues",
            "us-gaap_SalesRevenueNet",
          ]);

          const grossProfit = getValue(report, [
            "us-gaap_GrossProfit",
          ]);

          return {
            year: item.year,
            revenue,
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
            grossProfit,
          };
        }
      );

      setIncomeStatement(formatted);
    };

    load();
  }, [ticker]);

  return incomeStatement ? (
    <Table config={configs} data={incomeStatement} />
  ) : (
    <Spinner />
  );
};

export default IncomeStatement;