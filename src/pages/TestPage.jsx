import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { getTransactions } from "../utils/axiosHelper";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

export default function ProductsDemo() {
  const [transactions, setTransactions] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState(null);

  const fillTable = async () => {
    try {
      const response = await getTransactions();
      if (response?.status === "error") {
        setTransactions([]);
        throw new Error(response.message);
      } else {
        console.log(response.data);
        setTransactions(response.data);
      }
    } catch (error) {
      setError(error.message);
      setPosts([]);
    }
  };
  useEffect(() => {
    fillTable();
  }, []);

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Transactions </h4>
    </div>
  );

  const incrementTemplate = (rowData, options) => {
    return options.rowIndex + 1;
  };

  const dateTemplate = (rowData) => {
    return rowData.createdAt ? rowData.createdAt.split("T")[0] : "";
  };

  const actionTemplate = (rowData) => {
    return (
      <>
        <MDBBtn color="info" size="sm">
          <MDBIcon fas icon="edit" />
        </MDBBtn>
        &nbsp;
        <MDBBtn color="danger" size="sm">
          <MDBIcon fas icon="trash" />
        </MDBBtn>
      </>
    );
  };
  return (
    <div>
      <div className="card">
        <DataTable
          value={transactions}
          dataKey="_id"
          selection={selectedTransactions}
          onSelectionChange={(e) => setSelectedTransactions(e.value)}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          header={header}
        >
          <Column selectionMode="multiple" exportable={false} />
          <Column
            header="No."
            body={incrementTemplate}
            style={{ width: "50px" }}
          />
          <Column header="Date" body={dateTemplate} />
          <Column field="title" header="Title" />
          <Column field="income" header="Income" />
          <Column field="expenses" header="Expenses" />
          <Column header="Action" body={actionTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
