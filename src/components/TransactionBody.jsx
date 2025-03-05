import React from "react";
import { MDBBtn, MDBTableBody, MDBCheckbox, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
export const TransactionBody = ({
  transaction,
  index,
  selectAllChecked,
  onSelectChange,
  deleteFunction,
  editFunction
  
}) => {
  //  console.log("transaction", transaction._id)
  const formattedDate = transaction.createdAt? transaction.createdAt.split("T")[0]:"1";
  const navigate = useNavigate();
 

  return (
    <tr>
      <th scope="col">
        <MDBCheckbox checked={selectAllChecked} onChange={onSelectChange} />
      </th>
      <th scope="row">{index + 1}</th>
      <td> {formattedDate}</td>
      <td>{transaction.title}</td>
      <td className="text-success">
        <MDBIcon className="me-1" fas icon="caret-up" />
        {transaction.income}
      </td>
      <td className="text-danger">
        <MDBIcon className="me-1" fas icon="caret-down" />
        {transaction.expenses}
      </td>
      <td>
        <MDBBtn color="info">
          <MDBIcon
            fas
            icon="edit"
            onClick={() => editFunction(transaction._id)}
          />
        </MDBBtn>{" "}
        &nbsp;
        <MDBBtn color="danger" onClick={() => deleteFunction(transaction._id)}>
          <MDBIcon fas icon="trash" />
        </MDBBtn>
      </td>
    </tr>
  );
};
