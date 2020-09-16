import React from "react";
import BudgetItem from "./BudgetItem";

function BudgetList({ totalBudgetItems, handleDelete, handleEdit }) {
  return (
    <div className="c-overflow-scrol">
      <ul className="list-group ">
        {totalBudgetItems.map((totalBudgetItem) => {
          return (
            <BudgetItem
              key={totalBudgetItem.id}
              totalBudgetItem={totalBudgetItem}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default BudgetList;
