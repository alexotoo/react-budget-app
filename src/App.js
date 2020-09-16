import React, { useState } from "react";
import BudgetForm from "./components/BudgetForm";
import BudgetList from "./components/BudgetList";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import Alert from "./components/Alert";

const intialExp = [
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 400.0,
    des: "rent",
    type: "expense",
  },
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 800.98,
    des: "books",
    type: "expense",
  },
];

const intialInc = [
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 1200,
    des: "contract",
    type: "income",
  },
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 3100,
    des: "sales project",
    type: "income",
  },
];
const initalTotalBudgetItems = [...intialInc, ...intialExp];

function App() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [id, setId] = useState(0);
  const [edit, setEdit] = useState(false);

  const [totalExpense, setTotalExpense] = useState(intialExp);
  const [totalIncome, setTotalIncome] = useState(intialInc);

  const [totalBudgetItems, setTotalBudgetItems] = useState(
    initalTotalBudgetItems
  );

  const [alert, setAlert] = useState({ show: false });

  const totalExpAmount = totalExpense.reduce((acc, curr) => {
    return parseFloat((acc += curr.amount));
  }, 0);
  const totalIncAmount = totalIncome.reduce((acc, curr) => {
    return parseFloat((acc += curr.amount));
  }, 0);

  //get budget item "income" or "expense"
  const handleType = (e) => {
    setType(e.target.value);
  };

  //get description
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  //get amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  //cancel input
  const handleCancel = () => {
    setAmount("");
    setDescription("");
  };

  //alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };

  //edit and update
  const handleEdit = (id, type) => {
    console.log(`item edited: ${id},${type}`);
    setEdit(true);
    if (type === "income") {
      let toEditIncome = totalIncome.find((item) => item.id === id);
      setAmount(toEditIncome.amount);
      setDescription(toEditIncome.des);
      setId(toEditIncome.id);
      console.log(toEditIncome);
    } else {
      let toEditExpense = totalExpense.find((item) => item.id === id);
      setAmount(toEditExpense.amount);
      setDescription(toEditExpense.des);
      setId(toEditExpense.id);
      console.log(toEditExpense);
    }
  };

  //delete and update items
  const handleDelete = (id, type) => {
    if (type === "income") {
      let filtedIncome = totalIncome.filter((item) => item.id !== id);
      let filteredTotalBudget = totalBudgetItems.filter(
        (item) => item.id !== id
      );
      setTotalIncome(filtedIncome);
      setTotalBudgetItems(filteredTotalBudget);
    } else {
      let filtedExpense = totalExpense.filter((item) => item.id !== id);
      let filteredTotalBudget = totalBudgetItems.filter(
        (item) => item.id !== id
      );
      setTotalExpense(filtedExpense);
      setTotalBudgetItems(filteredTotalBudget);
    }
  };

  //submit and update items
  const handleSubmit = (e) => {
    e.preventDefault();

    if (type !== "type" && description !== "" && amount > 0) {
      if (type === "income") {
        const newIncome = {
          id: uuidv4(),
          created: moment().format("lll"),
          amount: parseFloat(amount),
          des: description,
          type,
        };
        setTotalIncome([...totalIncome, newIncome]);
        setTotalBudgetItems([...totalBudgetItems, newIncome]);
        handleAlert({ type: "success", text: "income added" });
        setAmount("");
        setDescription("");
      } else if (type === "expense") {
        const newExpense = {
          id: uuidv4(),
          created: moment().format("lll"),
          amount: parseFloat(amount),
          des: description,
          type,
        };
        setTotalExpense([...totalExpense, newExpense]);
        setTotalBudgetItems([...totalBudgetItems, newExpense]);
        handleAlert({ type: "success", text: "expense added" });
        setAmount("");
        setDescription("");
      } else if (type === "type") {
        setAmount(amount);
        setDescription(description);
      } else {
        handleAlert({ type: "danger", text: "Please select item type" });
      }
    } else {
      handleAlert({ type: "danger", text: "Please complete all inputs" });
    }
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center  min-vh-100 c-bg-color p-5 c-app-padding">
        <div className=" w-100  p-3 c-app-bg">
          <p className="text-center text-white m-0">Your available balance</p>

          <h1 className="text-center text-white ">
            $ {(totalIncAmount - totalExpAmount).toLocaleString()}
          </h1>

          <div className="d-flex justify-content-around border border-secondary text-success py-2 rounded c-border">
            <div>
              <p className="m-0">Total Income</p>
              <h5 className="text-center">
                $ {totalIncAmount.toLocaleString()}
              </h5>
            </div>
            <div>
              <p className="text-danger m-0">Total Expense</p>
              <h5 className="text-center text-danger">
                $ {totalExpAmount.toLocaleString()}
              </h5>
            </div>
          </div>
          {alert.show && <Alert type={alert.type} text={alert.text} />}
          <BudgetForm
            type={type}
            description={description}
            amount={amount}
            handleAmount={handleAmount}
            handleType={handleType}
            handleDescription={handleDescription}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
          />
          <BudgetList
            totalBudgetItems={totalBudgetItems}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
      </div>
    </>
  );
}

export default App;
