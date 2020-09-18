import React from "react";
import BudgetItem from "./BudgetItem";

function BudgetList({ totalBudgetItems, handleDelete, handleEdit }) {
  return (
    <div className="c-overflow-scrol rounded ">
      <ul className="list-group list-group-flush d-flex flex-column-reverse ">
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
