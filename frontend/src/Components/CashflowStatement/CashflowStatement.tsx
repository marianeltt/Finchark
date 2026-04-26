import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getCashFlow } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatLargeMonetaryNumber } from "../../Helpers/NumberFormatting";

type Props = {};

interface CashFlow {
  year: string;
  operatingCashFlow: number;
  capex: number;
  investingCashFlow: number;
  financingCashFlow: number;
  freeCashFlow: number;
}

const getValue = (report: any, concepts: string[]) => {
  const data = report?.cf || [];

  for (const concept of concepts) {
    const found = data.find((x: any) => x.concept === concept);
    if (found) return found.value;
  }

  return 0;
};

const config = [
  {
    label: "Year",
    render: (company: CashFlow) => company.year,
  },
  {
    label: "Operating Cashflow",
    render: (company: CashFlow) =>
      formatLargeMonetaryNumber(company.operatingCashFlow || 0),
  },
  {
    label: "CapEX",
    render: (company: CashFlow) =>
      formatLargeMonetaryNumber(company.capex || 0),
  },
  {
    label: "Investing Cashflow",
    render: (company: CashFlow) =>
      formatLargeMonetaryNumber(company.investingCashFlow || 0),
  },
  {
    label: "Financing Cashflow",
    render: (company: CashFlow) =>
      formatLargeMonetaryNumber(company.financingCashFlow || 0),
  },
  {
    label: "Free Cash Flow",
    render: (company: CashFlow) =>
      formatLargeMonetaryNumber(company.freeCashFlow || 0),
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashFlowData, setCashFlowData] = useState<CashFlow[] | null>(null);

  useEffect(() => {
    const load = async () => {
      const result = await getCashFlow(ticker!);

      if (!result || result.length === 0) {
        setCashFlowData([]);
        return;
      }

      const formatted: CashFlow[] = result.map((item: any) => {
        const report = item.report;

        const operating = getValue(report, [
          "us-gaap_NetCashProvidedByUsedInOperatingActivities",
        ]);

        const capex = getValue(report, [
          "us-gaap_PaymentsToAcquirePropertyPlantAndEquipment",
        ]);

        const investing = getValue(report, [
          "us-gaap_NetCashProvidedByUsedInInvestingActivities",
        ]);

        const financing = getValue(report, [
          "us-gaap_NetCashProvidedByUsedInFinancingActivities",
        ]);

        return {
          year: item.year || "N/A",
          operatingCashFlow: operating,
          capex: capex,
          investingCashFlow: investing,
          financingCashFlow: financing,
          freeCashFlow: operating - capex,
        };
      });

      setCashFlowData(formatted);
    };

    load();
  }, [ticker]);

  return (
    <>
      {cashFlowData ? (
        cashFlowData.length > 0 ? (
          <Table config={config} data={cashFlowData} />
        ) : (
          <h1>No cashflow data found</h1>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default CashflowStatement;