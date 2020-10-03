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
    amount: 380.0,
    description: "rent",
    type: "expense",
  },
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 400.0,
    description: "shopping",
    type: "expense",
  },
];

const intialInc = [
  {
    id: uuidv4(),
    created: moment().format("lll"),
    amount: 3100.0,
    description: "salary",
    type: "income",
  },
];
const initalTotalBudgetItems = [...intialInc, ...intialExp];

//*********** start  ***********/
function App() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const [totalExpense, setTotalExpense] = useState(intialExp);
  const [totalIncome, setTotalIncome] = useState(intialInc);

  const [totalBudgetItems, setTotalBudgetItems] = useState(
    initalTotalBudgetItems
  );

  const [edit, setEdit] = useState(false);
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
  //alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };

  //cancel input
  const handleCancel = (e) => {
    e.preventDefault();
    if (type === "type" || !edit) {
      setAmount("");
      setDescription("");
      handleAlert({ type: "success", text: "you cancelled" });
    } else {
      handleSubmit(e);
      handleAlert({ type: "success", text: "you cancelled" });
      setAmount("");
      setDescription("");
    }
  };

  //edit and update
  const handleEdit = (id, type) => {
    console.log(`item edited: ${id},${type}`);
    if (!edit) {
      if (type === "income") {
        let toEditIncome = totalIncome.find((item) => item.id === id);
        setAmount(toEditIncome.amount);
        setDescription(toEditIncome.description);
        setType(toEditIncome.type);

        console.log(toEditIncome);
      } else {
        let toEditExpense = totalExpense.find((item) => item.id === id);
        setAmount(toEditExpense.amount);
        setDescription(toEditExpense.description);
        setType(toEditExpense.type);

        console.log(toEditExpense);
      }
    } else {
      handleAlert({ type: "success", text: "editing is in progress" });
    }

    setEdit(true);
    handleDelete(id, type);
  };

  //delete and update items
  const handleDelete = (id, type) => {
    if (!edit) {
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
    } else {
      handleAlert({ type: "danger", text: "editing is in progress" });
      return;
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
          description,
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
          description,
          type,
        };
        setTotalExpense([...totalExpense, newExpense]);
        setTotalBudgetItems([...totalBudgetItems, newExpense]);
        handleAlert({ type: "success", text: "expense added" });
        setAmount("");
        setDescription("");
      } else if (
        type === "type" ||
        amount !== undefined ||
        description !== undefined
      ) {
        handleAlert({ type: "danger", text: "Please select item type" });
        setAmount(amount);
        setDescription(description);
      }
    } else {
      handleAlert({ type: "danger", text: "Please complete all inputs" });
    }
    setEdit(false);
  };

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center  min-vh-100 c-bg-color c-app-padding">
        <div className=" w-100  p-3 c-app-bg">
          <p className="text-center text-white m-0">Your available balance</p>
          {(totalIncAmount - totalExpAmount).toLocaleString() < 0 ? (
            <h1 className="text-center text-danger ">
              $ {(totalIncAmount - totalExpAmount).toLocaleString()}
            </h1>
          ) : (
            <h1 className="text-center text-white ">
              $ {(totalIncAmount - totalExpAmount).toLocaleString()}
            </h1>
          )}

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
