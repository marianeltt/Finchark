import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getCashFlow } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";

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
    render: (company: CashFlow) => company.operatingCashFlow,
  },
  {
    label: "CapEX",
    render: (company: CashFlow) => company.capex,
  },
  {
    label: "Investing Cashflow",
    render: (company: CashFlow) => company.investingCashFlow,
  },
  {
    label: "Financing Cashflow",
    render: (company: CashFlow) => company.financingCashFlow,
  },
  {
    label: "Free Cash Flow",
    render: (company: CashFlow) => company.freeCashFlow,
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashFlowData, setCashFlowData] = useState<CashFlow[]>();

  useEffect(() => {
    const load = async () => {
      const result = await getCashFlow(ticker!);

      const formatted = result.map((item: any) => {
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
          year: item.year,
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

  return cashFlowData ? (
    <Table config={config} data={cashFlowData} />
  ) : (
    <Spinner />
  );
};

export default CashflowStatement;