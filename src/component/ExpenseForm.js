import React from "react";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({
  amount,
  charge,
  handleAmount,
  handleCharge,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            value={charge}
            onChange={handleCharge}
            placeholder="e.g charge"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmount}
            placeholder="e.g amount"
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "Edit" : "submit"}

        <MdSend className="btn-icon" />
      </button>
    </form>
  );
};

export default ExpenseForm;
