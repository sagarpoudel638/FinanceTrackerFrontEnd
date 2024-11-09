import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableHead, MDBCheckbox } from "mdb-react-ui-kit";
import { TransactionBody } from "../components/TransactionBody";
import { getTransactions,deleteTransaction } from "../utils/axiosHelper";
import { toast } from "react-toastify";

export default function Transactions() {
  // const transactionData = {
  //   title,
  //   income,
  //   expenses,
  //   date,
  // }

  const [transactions, setTransactions] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());
  const fillTable = async () => {
    try {
      const response = await getTransactions();
      if (response?.status === "error") {
        setTransactions([]);
        throw new Error(response.message);
      } else {
        console.log(response.data);
        setTransactions(response.data); // Ensure you access the correct data property
      }
    } catch (error) {
      setError(error.message);
      setTransactions([]);
    }
  };
  useEffect(() => {
    fillTable();
  }, []);

  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedTransactions(new Set());
    } else {
      const allTransactionIds = new Set(transactions.map((_, index) => index));
      setSelectedTransactions(allTransactionIds);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const handleSelectChange = (index) => {
    const updatedSelectedTransactions = new Set(selectedTransactions);
    if (updatedSelectedTransactions.has(index)) {
      updatedSelectedTransactions.delete(index);
    } else {
      updatedSelectedTransactions.add(index);
    }
    setSelectedTransactions(updatedSelectedTransactions);
    if (updatedSelectedTransactions.size === transactions.length) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  };

  const deleteFunction =async(id)=>{
    try {
      const response = await deleteTransaction(id);
      if (response.status == "success") {
        toast.success(response.message);
        fillTable();
      } else {
        toast.error(response.message.details);
      }

    } catch (error) {
      console.error("Error deleting transaction:", error);
    toast.error("An error occurred while deleting the transaction. Please try again.");
    }
  };
  return (

    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">
            <MDBCheckbox checked={selectAllChecked}
          onChange={handleSelectAll}></MDBCheckbox>
          </th>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Title</th>
          <th scope="col">Income</th>
          <th scope="col">Expenses</th>
          <th scope="col">Action</th>
        </tr>
      </MDBTableHead>
      {transactions.map((transaction, index) => (
        <TransactionBody
          key={transaction._id}
          transaction={transaction}
          index={index}
          selectAllChecked={selectedTransactions.has(index)}
          onSelectChange={() => handleSelectChange(index)}
          deleteFunction = {deleteFunction}
        />
      ))}
    </MDBTable>
  );
}
