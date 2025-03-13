import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTableBody,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,

} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { TransactionBody } from "../components/TransactionBody";
import {
  getTransactions,
  deleteTransaction,
  createTransaction,
  updateTransaction,
  getTransactionsByID,
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
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const tid = queryParams.get("id");
  const [transactionID, setTid] = useState();
  const [searchTerm, setSearchTerm] = useState("");


  const fillTable = async () => {
    try {
      const response = await getTransactions();
      if (response?.status === "error") {
        setTransactions({
          type: "income",
          title: "",
          amount: "",
          createdAt: "",
        });
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter transactions based on the search term
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // // Handle all checkbox selection
  // const handleSelectAll = () => {
  //   if (selectAllChecked) {
  //     setSelectedTransactions(new Set());
  //   } else {
  //     const allTransactionIds = new Set(transactions.map((_, index) => index));
  //     setSelectedTransactions(allTransactionIds);
  //   }
  //   setSelectAllChecked(!selectAllChecked);
  // };
  // Handle Check Box Selection
  const handleSelectAllChange = () => {
    if (selectedTransactions.size === filteredTransactions.length) {
      // Unselect all
      setSelectedTransactions(new Set());
    } else {
      // Select all visible (filtered) transactions by their IDs
      const allIds = new Set(filteredTransactions.map((t) => t._id));
      setSelectedTransactions(allIds);
    }
  };
  const handleSelectChange = (id) => {
    const newSelected = new Set(selectedTransactions);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTransactions(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (selectedTransactions.size === 0) {
      toast.warn('No transactions selected.');
      return;
    }
  
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedTransactions.size} selected transaction(s)?`
    );
  
    if (!confirmDelete) return;
  
    try {
      for (let id of selectedTransactions) {
        const response = await deleteTransaction(id);
        if (response.status === 'success') {
          toast.success(`Deleted transaction with ID: ${id}`);
        } else {
          toast.error(response.message.details || `Failed to delete ID: ${id}`);
        }
      }
  
      // After deleting all, refetch data and clear selections
      await fillTable();
      setSelectedTransactions(new Set());
    } catch (error) {
      console.error('Error deleting transactions:', error);
      toast.error('An error occurred while deleting selected transactions.');
    }
  };
  

  // Delete Function
  const deleteFunction = async (id) => {
    try {
      const response = await deleteTransaction(id);
      if (response.status == "success") {
        toast.success(response.message);
        await fillTable();
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
    id: "",
    title: "",
    income: "",
    expenses: "",
    type: "",
    createdAt: "",
  });
  const fillFormData = async (transactionID) => {
    console.log(transactionID);
    const response = await getTransactionsByID(transactionID);
    console.log(transactionID);
    // if (response.status == "success") {
    //   // console.log(response);
    //   // console.log(response.data.income)
    //   // console.log(response.data.expenses)
    //   if (response.data.income !== 0){
    //     setTransactionData({
    //       title: response.data.title,
    //       amount: response.data.income,
    //       type: "income",
    //       createdAt: response.data.createdAt ? response.data.createdAt.split("T")[0] : ""
    //     });
    //   }
    //   if (response.data.expenses !== 0){
    //     setTransactionData({
    //       title: response.data.title,
    //       amount: response.data.expenses,
    //       type: "expenses",
    //       createdAt: response.data.createdAt ? response.data.createdAt.split("T")[0] : ""
    //     });
    //   }

    // }
    if (response.status === "success") {
      const { title, income, expenses, createdAt } = response.data;

      // Determine the transaction type
      let type = "income"; // Default type
      let amount = income;

      if (expenses !== "0") {
        type = "expenses";
        amount = expenses;
      }

      // Set transaction data once
      setTransactionData({
        title,
        amount,
        type,
        createdAt: createdAt ? createdAt.split("T")[0] : "",
      });
    } else {
      console.log("ERROR fetching Transaction data");
    }
  };

  const totals = calculateTotals(filteredTransactions);

  const editFunction = (transactionid) => {
    setTid(transactionid);
    fillFormData(transactionid);
    setModalShow(true);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setTransactionData((prevData) => {
      let updatedData = { ...prevData, [name]: value };

      if (name === "type") {
        updatedData.amount = "";
        updatedData.income = value === "income" ? prevData.amount || "0" : "0";
        updatedData.expenses =
          value === "expenses" ? prevData.amount || "0" : "0";
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
    let response;
    try {
      if (transactionID) {
        response = await updateTransaction(transactionID, transactionData);
      } else {
        response = await createTransaction(transactionData);
      }

      console.log(response.status);
      if (response.status == "success") {
        navigate("/transactions");
        handleModalClose();
        setTransactionData("");
        toast.success(response.message);
      }
    } catch (error) {
      {
        transactionID
          ? console.error("Error updating transaction:", error)
          : console.error("Error creating transaction:", error);
      }
      {
        transactionID
          ? toast.error(
              "An error occurred while updating the transaction. Please try again."
            )
          : toast.error(
              "An error occurred while deleting the transaction. Please try again."
            );
      }
    }
  };
  /* Calulating income, expenses and net status
  const calculateTotals = () => {
    const totalIncome = transactions.reduce(
      (sum, transaction) => sum + (parseFloat(transaction.income) || 0),
      0
    );
    const totalExpenses = transactions.reduce(
      (sum, transaction) => sum + (parseFloat(transaction.expenses) || 0),
      0
    );
    const netStatus = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, netStatus };
  }; */

  useEffect(() => {
    fillTable();
  }, [transactionData]);

  return (
    <>
      &nbsp;
      
      <Container style={{ display: "flex" }}>
       
        <div style={{ display: "flex" }}>
          <MDBBtn color="success" fas onClick={handleModalShow}>
            <MDBIcon fas icon="add" />
          </MDBBtn>{" "}
          &nbsp;
          <MDBBtn color="danger" onClick={handleDeleteSelected} disabled={selectedTransactions.size === 0}>
            <MDBIcon fas icon="trash" />
          </MDBBtn>
        </div>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <MDBInput
          label="Search"
          id="form-icon-trailing"
          striped
          hover
          responsive="sm"
          value={searchTerm}
          onChange={handleSearchChange}
        >
          {/* <MDBIcon fas icon="search" /> */}
        </MDBInput>
      </Container>
      <MDBTable striped hover responsive="sm">
        <MDBTableHead>
          <tr>
            <th scope="col">
              <MDBCheckbox
                checked={
                  selectedTransactions.size === filteredTransactions.length &&
                  filteredTransactions.length > 0
                }
                onChange={handleSelectAllChange}
              />
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
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
              <TransactionBody
                key={transaction._id}
                transaction={transaction}
                index={index}
                selectAllChecked={selectedTransactions.has(transaction._id)}
                onSelectChange={() => handleSelectChange(transaction._id)}
                deleteFunction={deleteFunction}
                editFunction={editFunction}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No transactions found
              </td>
            </tr>
          )}
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
      <Form
        id="form1"
        onSubmit={(e) => {
          e.preventDefault();
          handleOnsubmit();
          handleModalClose();
        }}
      >
        <Modal
          show={modalShow}
          onHide={handleModalClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            {transactionID ? (
              <Modal.Title>Edit Transaction</Modal.Title>
            ) : (
              <Modal.Title>Add Transaction</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form.Select
              name="type"
              value={transactionData.type}
              onChange={handleOnChange}
            >
              <option value="">Select:</option>
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
            {transactionID ? (
              <MDBBtn color="success" type="submit" form="form1">
                Update
              </MDBBtn>
            ) : (
              <MDBBtn color="success" type="submit" form="form1">
                Add
              </MDBBtn>
            )}
          </Modal.Footer>
        </Modal>


        
      </Form>
    </>
  );
}
