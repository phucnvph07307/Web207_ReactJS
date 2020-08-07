import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Invoice_API from "../../../../api/invoiceApi";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const Invoive = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getALLInvoices();
  }, []);
  const [invoice, setInvoice] = useState([]);
  const getALLInvoices = async () => {
    try {
      const response = await Invoice_API.getAll();
      if (response.statusText === "OK" && response.status < 300) {
        setInvoice(response.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">List Invoice</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Customer Phone</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">Customer Address</th>
                  <th scope="col">Toltal</th>
                  <th scope="col">Date</th>
                  <th scope="col">
                    <center>Action</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.map(
                  (
                    {
                      id,
                      customer_name,
                      customer_phone_number,
                      customer_email,
                      customer_address,
                      total_price,
                      created_at,
                    },
                    index
                  ) => (
                    <tr key={index}>
                      <th scope="row">{++index}</th>
                      <td>{customer_name}</td>
                      <td>{customer_phone_number}</td>
                      <td>{customer_email}</td>

                      <td>{customer_address}</td>
                      <td>${total_price}</td>
                      <td>{total_price}</td>
                      <td>
                        <center>
                          <Link
                            className="btn btn-outline"
                            to={`/admin/invoice/${id}`}
                          >
                            <i className="fas fa-eye text-primary"></i>
                          </Link>
                        </center>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Invoive.propTypes = {};

export default Invoive;
