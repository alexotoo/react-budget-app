import React from "react";
import BudgetForm from "./components/BudgetForm";
import ItemsList from "./components/ItemsList";

function App() {
  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center  min-vh-100 c-bg-color p-5 c-app-padding">
      <div className=" w-100  p-3 c-app-bg">
        <p className="text-center text-white m-0">Your available balance</p>
        <h1 className="text-center text-white ">$ 200.00</h1>

        <div className="d-flex justify-content-around border border-secondary text-success py-2 rounded c-border">
          <div>
            <p>Total Income</p>
            <h5 className="text-center">300.00</h5>
          </div>
          <div>
            <p className="text-danger">Total Expense</p>{" "}
            <h5 className="text-center text-danger">0</h5>
          </div>
        </div>

        <BudgetForm />
        <ItemsList />
      </div>
    </div>
  );
}

export default App;
