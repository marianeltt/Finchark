import React, { SyntheticEvent } from "react";
import "./Card.css";
import { CompanySearch } from "../../company";
import AddPortfolio from "../Portfolio/AddPortfolio/AddPortfolio";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const Card: React.FC<Props> = ({
  id,
  searchResult,
  onPortfolioCreate,
}: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row mb-3"
      key={id}
      id={id}
    >
      {/* Nome + símbolo */}
      <Link
        to={`/company/${searchResult.symbol}`}
        className="font-bold text-center md:text-left"
      >
        ({searchResult.symbol}) - {searchResult.description || "Sem descrição"}
      </Link>

      {/* Tipo */}
      <p className="text-gray-600">{searchResult.type}</p>

      {/* Botão */}
      <AddPortfolio
        onPortfolioCreate={onPortfolioCreate}
        symbol={searchResult.symbol}
      />
    </div>
  );
};

export default Card;