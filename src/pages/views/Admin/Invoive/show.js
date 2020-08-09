import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Invoice_API from "../../../../api/invoiceApi";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useParams } from "react-router-dom";
const InvoiveDetail = ({ products }) => {
  const [invoice_detail, setInvoiceDetail] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    getInvoiceDetail(id);
    console.log(products);
  }, []);

  const getInvoiceDetail = async (id) => {
    try {
      const response = await Invoice_API.get(id);
      console.log(response);
      if (response.statusText === "OK" && response.status < 300) {
        setInvoiceDetail(response.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">List Invoice Detail</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Invoice</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {invoice_detail.map((element, index) => (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{element.invoice_id}</td>
                    {products.map((el) => {
                      if (el.id == element.product_id) {
                        return <td>{el.name}</td>;
                      }
                    })}
                    {products.map((el) => {
                      if (el.id == element.product_id) {
                        return (
                          <td>
                            <img src={el.image} width={80} />
                          </td>
                        );
                      }
                    })}
                    <td>{element.quantity}</td>
                    <td>${element.unit_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

InvoiveDetail.propTypes = {};

export default InvoiveDetail;
