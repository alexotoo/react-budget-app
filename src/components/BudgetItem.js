import React from "react";

function BudgetItem({ totalBudgetItem: { id, type, amount, des, created } }) {
  //   console.log(totalBudgetItems, "from list");
  return type === "income" ? (
    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary bg-success mb-1">
      <span className="badge badge-primary badge-pill">{created}</span>
      <span className="badge badge-primary badge-pill">{des}</span>
      <span className="badge badge-primary badge-pill">{amount}</span>
    </li>
  ) : (
    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-primary bg-danger mb-1">
      <span className="badge badge-primary badge-pill">{created}</span>
      <span className="badge badge-primary badge-pill">{des}</span>
      <span className="badge badge-primary badge-pill">{amount}</span>
    </li>
  );
}

export default BudgetItem;
