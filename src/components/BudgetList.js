import React from "react";
import BudgetItem from "./BudgetItem";

function BudgetList() {
  return (
    <div className="c-overflow-scrol">
      <ul className="list-group ">
        <BudgetItem />
      </ul>
    </div>
  );
}

export default BudgetList;
