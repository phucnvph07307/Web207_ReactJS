import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Invoice_API from "../../../../api/invoiceApi";
import InvoiceDetail_API from "../../../../api/invoice_detaiApi";
import { Link } from "react-router-dom";

const Dashboard = ({ products, categories, news }) => {
  const [total, setTotal] = useState(0);
  const [countProduct, setCountProduct] = useState(0);

  useEffect(() => {
    TinhTong();
    getCountProduct();
  }, []);
  const TinhTong = async () => {
    try {
      const response = await Invoice_API.getAll();
      if (response) {
        getTotal(response.data);
      }
    } catch (error) {
      console.log("failed to request API: ", error);
    }
  };
  const getCountProduct = async () => {
    try {
      const response = await InvoiceDetail_API.getAll();
      if (response) {
        getCount(response.data);
      }
    } catch (error) {
      console.log("failed to request API: ", error);
    }
  };
  const getTotal = (array = []) => {
    const res = array.reduce((prev, item) => {
      return prev + item.total_price;
    }, 0);
    setTotal(res);
  };
  const getCount = (array = []) => {
    const res = array.reduce((prev, item) => {
      return prev + item.quantity;
    }, 0);
    setCountProduct(res);
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      {/* Content Row */}
      <div className="row">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <Link
                    to="/admin/category"
                    className="text-xs font-weight-bold text-primary text-uppercase mb-1"
                  >
                    Categories
                  </Link>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {categories.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <Link
                    to="/admin/products"
                    className="text-xs font-weight-bold text-success text-uppercase mb-1"
                  >
                    Products
                  </Link>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {products.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <Link
                    to="/admin/invoices"
                    className="text-xs font-weight-bold text-info text-uppercase mb-1"
                  >
                    Invoice
                  </Link>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        ${total}
                      </div>
                      <div className="h5 mb-0 mr-3 font-weight-bold text-danger">
                        products: {countProduct}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    News
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {news.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-news fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
