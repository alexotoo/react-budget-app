import React, { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetList from "./components/BudgetList";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const intialExp = [
  { id: uuidv4(), created: moment().format("lll"), amount: 400.0, des: "rent" },
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 800.98,
    des: "books",
  },
];

const intialInc = [
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 1200,
    des: "contract",
  },
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 3100,
    des: "sales project",
  },
];

function App() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [totalExpense, setTotalExpense] = useState(intialExp);
  const [totalIncome, setTotalIncome] = useState(intialInc);

  const [totalBudgetItems, setTotalBudgetItems] = useState(0);

  const totalExpAmount = totalExpense.reduce((acc, curr) => {
    return parseFloat((acc += curr.amount));
  }, 0);
  const totalIncAmount = totalIncome.reduce((acc, curr) => {
    return parseFloat((acc += curr.amount));
  }, 0);

  //console.log(totalIncome);

  const handleType = (e) => {
    setType(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type !== "type" && description !== "" && amount > 0) {
      if (type === "income") {
        const newIncome = {
          id: uuidv4(),
          created: moment().format("lll"),
          amount: parseFloat(amount),
          des: description,
        };
        setTotalIncome([...totalIncome, newIncome]);
      } else {
        const newExpense = {
          id: uuidv4(),
          created: moment().format("lll"),
          amount: parseFloat(amount),
          des: description,
        };
        setTotalExpense([...totalExpense, newExpense]);
      }
    } else {
      //invalide call
    }
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center  min-vh-100 c-bg-color p-5 c-app-padding">
      <div className=" w-100  p-3 c-app-bg">
        <p className="text-center text-white m-0">Your available balance</p>
        <h1 className="text-center text-white ">
          $ {(totalIncAmount - totalExpAmount).toLocaleString()}
        </h1>

        <div className="d-flex justify-content-around border border-secondary text-success py-2 rounded c-border">
          <div>
            <p className="m-0">Total Income</p>
            <h5 className="text-center">$ {totalIncAmount.toLocaleString()}</h5>
          </div>
          <div>
            <p className="text-danger m-0">Total Expense</p>
            <h5 className="text-center text-danger">
              $ {totalExpAmount.toLocaleString()}
            </h5>
          </div>
        </div>

        <BudgetForm
          type={type}
          description={description}
          amount={amount}
          handleAmount={handleAmount}
          handleType={handleType}
          handleDescription={handleDescription}
          handleSubmit={handleSubmit}
        />
        <BudgetList />
      </div>
    </div>
  );
}

export default App;
