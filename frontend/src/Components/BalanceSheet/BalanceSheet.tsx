import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";

type Props = {};

interface Item {
  label: string;
  value: number;
}

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBalanceSheet(ticker!);

      const bs = result?.data[0]?.report?.bs;

      setData(bs || []);
    };

    fetchData();
  }, [ticker]);

  const config = data.slice(0, 10).map((item) => ({
    label: item.label,
    render: () => item.value,
    subTitle: "Financial data",
  }));

  return (
    <>
      {data.length > 0 ? (
        <RatioList config={config} data={{}} />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default BalanceSheet;