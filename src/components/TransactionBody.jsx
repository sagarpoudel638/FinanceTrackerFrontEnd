import React from 'react'
import {
    MDBBtn,
    MDBTableBody,
    MDBCheckbox,
    MDBIcon
  } from "mdb-react-ui-kit";
export const TransactionBody = ({transaction, index, selectAllChecked, onSelectChange, deleteFunction}) => {
    //  console.log("transaction", transaction._id)
    const formattedDate = transaction.createdAt.split("T")[0];

  return (
    
    <MDBTableBody>
        <tr>
          <th scope="col">
          <MDBCheckbox checked={selectAllChecked} onChange={onSelectChange} />
          </th>
          <th scope="row">{index + 1}</th>
          <td> {
         formattedDate}</td>
          <td>{transaction.title}</td>
          <td className="text-success"><MDBIcon className='me-1' fas icon='caret-up' />{transaction.income}</td>
          <td className="text-danger"><MDBIcon className='me-1' fas icon='caret-down' />{transaction.expenses}</td>
          <td>
            <MDBBtn color="info"><MDBIcon fas icon="edit"  /></MDBBtn> &nbsp;
            <MDBBtn color="danger" onClick= {()=>deleteFunction(transaction._id)} ><MDBIcon fas icon="trash" /></MDBBtn>
          </td>
        </tr>
      </MDBTableBody>
  )
}
