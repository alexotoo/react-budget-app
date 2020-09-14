import React from "react";

function BudgetForm() {
  return (
    <div className="py-3">
      <form action="" className="">
        <select class="form-control form-control-lg mb-3 ">
          <option>Type</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
        <input
          type="text"
          class="form-control form-control-lg mb-3"
          type="text"
          placeholder="Amount"
        />
        <input
          type="text"
          class="form-control form-control-lg"
          type="text"
          placeholder="Description"
        />
        <div className="d-flex justify-content-between mt-3">
          <button type="submit" class="btn btn-success c-btn mb-2">
            Add
          </button>
          <button type="submit" class="btn btn-danger c-btn  mb-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BudgetForm;
