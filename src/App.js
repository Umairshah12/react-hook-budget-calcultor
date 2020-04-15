import React, { useState, useEffect } from "react";
import "./App.css";
import uuid from "uuid/v4";
import Alert from "./component/Alert";
import ExpenseForm from "./component/ExpenseForm";
import ExpenseList from "./component/ExpenseList";

// 1) First step

// const initialExpenses = [
//   { id: uuid(), charge: "electricity bill", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 500 },
//   { id: uuid(), charge: "gas bill", amount: 600 },
// ];

const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // all expense hooks code
  const [expenses, setExpense] = useState(initialExpenses);

  // amount and single charge state which i set in object
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");

  // alert state
  const [alert, setAlert] = useState({ show: false });

  // edit button state
  const [edit, setEdit] = useState(false);

  // specific element edit in list of expanse state
  const [id, setId] = useState(0);

  // useEffect hook
  useEffect(() => {
    console.log("we clicked use effect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // alert handle function
  const alertHandle = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  // onchange handlecharge function
  const handleCharge = (event) => {
    // console.log(event.target.value);
    setCharge(event.target.value);
  };

  // onChange handleAmount function
  const handleAmount = (event) => {
    // console.log(event.target.value);
    setAmount(event.target.value);
  };

  // onhandle delete function
  const handleDelete = (id) => {
    const tempExpenses = expenses.filter((item) => item.id !== id);
    setExpense(tempExpenses);
    alertHandle({ type: "danger", text: "item deleted successfully" });
  };

  //onhandle edit function
  const handleEdit = (id) => {
    let simpleExpense = expenses.find((item) => item.id === id);
    let { charge, amount } = simpleExpense;
    setAmount(amount);
    setCharge(charge);
    setEdit(true);
    setId(id);
  };

  // clear expense function
  const clearExpense = () => {
    setExpense([]);
    alertHandle({ type: "success", text: "All expense is clear" });
  };

  //handle submit function
  const handleSubmit = (event) => {
    event.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempdataExpenses = expenses.map((item) =>
          item.id === id ? { ...item, charge, amount } : item
        );
        setExpense(tempdataExpenses);
        setEdit(false);
        alertHandle({ type: "success", text: "item edited successfully" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpense([...expenses, singleExpense]);
        alertHandle({ type: "success", text: "item added" });
      }

      setAmount("");
      setCharge("");
    } else {
      alertHandle({
        type: "danger",
        text: `charge cannot be empty and amount 
      value must be greater than 0`,
      });
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          amount={amount}
          charge={charge}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearExpense={clearExpense}
        />
      </main>
      <h1>
        spending total :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, cur) => {
            return (acc += parseInt(cur.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
