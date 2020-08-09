import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="pt-5">
      <div className="container">
        <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
          <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
            Home
            <i className="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true" />
          </a>
          <span className="stext-109 cl4">Shoping Cart</span>
        </div>
      </div>
      {/* Shoping Cart */}
      <div className="container" style={{ height: "500px" }}>
        <div className="row">
          <div className="col-lg-10 col-xl-7 m-lr-auto m-b-50">
            <div className="m-l-25 m-r--38 m-lr-0-xl">
              <div className="wrap-table-shopping-cart">
                <table className="table-shopping-cart">
                  <tbody>
                    <tr className="">
                      <th className="text-center text-success">
                        <h1>Cảm ơn quý khác đã mua hàng</h1>
                        <Link to="/">
                          <i class="fas fa-arrow-left"></i> về trang chủ
                        </Link>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
