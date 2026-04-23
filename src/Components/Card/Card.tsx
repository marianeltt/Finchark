import React from 'react';
import "./Card.css";

interface Props {
  companyName: string;
  ticker: string;
  price: number;
}

const Card: React.FC<Props> = ({ companyName, ticker, price }) => {
  return (
    <div className="card">
      <img
        src="https://images.unsplash.com/photo-1775112862811-29f3adb7f990?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Image"
      />
      <div className="details">
        <h2>{companyName} ({ticker})</h2>
        <p>{price}</p>
        <p className="info">
          tanto faz
        </p>
      </div>
    </div>
  )
}

export default Card