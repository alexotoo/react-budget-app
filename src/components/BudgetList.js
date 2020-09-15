import React from "react";
import BudgetItem from "./BudgetItem";

function BudgetList({ totalBudgetItems }) {
  return (
    <div className="c-overflow-scrol">
      <ul className="list-group ">
        {totalBudgetItems.map((totalBudgetItem) => {
          return (
            <BudgetItem
              key={totalBudgetItem.id}
              totalBudgetItem={totalBudgetItem}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default BudgetList;
