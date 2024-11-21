import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { TransactionBody } from "../components/TransactionBody";
import {
  getTransactions,
  deleteTransaction,
  createTransaction,
} from "../utils/axiosHelper";
import { toast } from "react-toastify";
import { Container } from "react-bootstrap";
import { calculateTotals } from "../utils/helper";

export default function Transactions() {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState(new Set());
  const fillTable = async () => {
    try {
      const response = await getTransactions();
      if (response?.status === "error") {
        setTransactions({type: "income",
          title: "",
          amount: "",
          createdAt: "",});
        throw new Error(response.message);
      } else {
        //console.log(response.data);
        setTransactions(response.data); 
      }
    } catch (error) {
      //setError(error.message);
      setTransactions({});
    }
  };

  // Handle all checkbox selection
  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedTransactions(new Set());
    } else {
      const allTransactionIds = new Set(transactions.map((_, index) => index));
      setSelectedTransactions(allTransactionIds);
    }
    setSelectAllChecked(!selectAllChecked);
  };
  // Handle Check Box Selection
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
  // Delete Function
  const deleteFunction = async (id) => {
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
      toast.error(
        "An error occurred while deleting the transaction. Please try again."
      );
    }
  };
  //Modal
  const handleModalShow = () => setModalShow(true);
  const handleModalClose = () => setModalShow(false);
  // Creating Transaction
  const [transactionData, setTransactionData] = useState({
    title: "",
    income: "",
    expenses: "",
    type:"",
    createdAt: "",
  });

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
    
  //   setTransactionData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
    
  //   console.log({ ...transactionData, [name]: value });
  // };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
  
    setTransactionData((prevData) => {
      let updatedData = { ...prevData, [name]: value };
  
      if (name === "type") {
        if (value === "income") {
          updatedData.income = prevData.amount || "0"; 
          updatedData.expenses = "0"; 
        } else if (value === "expenses") {
          updatedData.expenses = prevData.amount || "0"; 
          updatedData.income = "0"; 
        }
      } else if (name === "amount") {
        if (prevData.type === "income") {
          updatedData.income = value; 
          updatedData.expenses = "0"; 
        } else if (prevData.type === "expenses") {
          updatedData.expenses = value; 
          updatedData.income = "0";
        }
      }
  
      return updatedData;
    });
  
    console.log(transactionData);
  };
  const handleOnsubmit = async (e) => {
    try {
      const response = await createTransaction(transactionData);
      console.log(response.status)
      if (response.status == "success") {
        navigate("/transactions");
        handleModalClose();
        setTransactionData("");
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error(
        "An error occurred while deleting the transaction. Please try again."
      );
    }
  };
  // // Calulating income, expenses and net status
  // const calculateTotals = () => {
  //   const totalIncome = transactions.reduce(
  //     (sum, transaction) => sum + (parseFloat(transaction.income) || 0),
  //     0
  //   );
  //   const totalExpenses = transactions.reduce(
  //     (sum, transaction) => sum + (parseFloat(transaction.expenses) || 0),
  //     0
  //   );
  //   const netStatus = totalIncome - totalExpenses;

  //   return { totalIncome, totalExpenses, netStatus };
  // };

  

  const totals = calculateTotals();
  useEffect(() => {
    fillTable();
  }, []);
  return (
    <>
      &nbsp;
      <Container style={{ display: "flex" }}>
        <div style={{ display: "flex" }}>
          <MDBBtn color="success" fas icon="trash" onClick={handleModalShow}>
            <MDBIcon fas icon="add" />
          </MDBBtn>{" "}
          &nbsp;
          <MDBBtn
            color="danger"
            // onClick= {()=>deleteFunction(transaction._id)}
          >
            <MDBIcon fas icon="trash" />
          </MDBBtn>
        </div>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <MDBInput
          style={{ width: "400px" }}
          label="Search"
          id="form-icon-trailing"
        >
          {/* <MDBIcon fas icon="search" /> */}
        </MDBInput>
      </Container>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">
              <MDBCheckbox
                checked={selectAllChecked}
                onChange={handleSelectAll}
              ></MDBCheckbox>
            </th>
            <th scope="col">#</th>
            <th scope="col">Date</th>
            <th scope="col">Title</th>
            <th scope="col">Income</th>
            <th scope="col">Expenses</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {transactions.map((transaction, index) => (
            <TransactionBody
              key={transaction._id}
              transaction={transaction}
              index={index}
              selectAllChecked={selectedTransactions.has(index)}
              onSelectChange={() => handleSelectChange(index)}
              deleteFunction={deleteFunction}
            />
          ))}
          <tr>
            <td colSpan="4">
              <strong>Totals</strong>
            </td>
            <td>
              <strong>${totals.totalIncome.toFixed(2)}</strong>
            </td>
            <td>
              <strong>${totals.totalExpenses.toFixed(2)}</strong>
            </td>
            <td>
              <strong>Net: ${totals.netStatus.toFixed(2)}</strong>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
      <Form  id = "form1" onSubmit={(e)=>{e.preventDefault();
        handleOnsubmit();
        handleModalClose();

      }}>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select
            name="type"
            value={transactionData.type}
            onChange={handleOnChange}
          >
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>{" "}
          &nbsp;
          <MDBInput
            style={{ width: "400px" }}
            label="Enter Title"
            id="form-icon-trailing"
            name="title"
            value={transactionData.title}
            onChange={handleOnChange}
          ></MDBInput>
          &nbsp;
          <MDBInput
            style={{ width: "400px" }}
            label="Enter Amount"
            id="form-icon-trailing"
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleOnChange}
          ></MDBInput>{" "}
          &nbsp;
          <Form.Control
            type="date"
            name="createdAt"
            value={transactionData.createdAt}
            onChange={handleOnChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <MDBBtn color="danger" onClick={handleModalClose}>
            Close
          </MDBBtn>
          <MDBBtn color="success" type="submit" form="form1">
            Add
          </MDBBtn>
        </Modal.Footer>
      </Modal>
      </Form>
    </>
  );
}
