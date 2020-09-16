import React from "react";

function BudgetForm({
  amount,
  type,
  description,
  handleAmount,
  handleType,
  handleDescription,
  handleSubmit,
  handleCancel,
}) {
  return (
    <div className="py-3">
      <form onSubmit={handleSubmit} action="" className="">
        <select
          onChange={handleType}
          value={type}
          className="form-control form-control-lg mb-3 "
        >
          <option defaultValue value="type">
            type
          </option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          className="form-control form-control-lg mb-3"
          onChange={handleAmount}
          value={amount}
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
        />
        <input
          className="form-control form-control-lg"
          onChange={handleDescription}
          value={description}
          type="text"
          id="description"
          name="description"
          placeholder="Description"
        />
        <div className="d-flex justify-content-between mt-3">
          <button type="submit" className="btn btn-success c-btn mb-2">
            Add
          </button>
          <button
            type=""
            className="btn btn-danger c-btn  mb-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BudgetForm;
