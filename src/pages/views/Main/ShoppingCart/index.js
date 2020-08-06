import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Swal from "sweetalert2";

const ShoppingCart = ({
  cart,
  redution,
  increase,
  removeItemCart,
  total,
  clearCart,
  getTotal,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const componentDidMount = () => {
    getTotal();
  };
  const onHandleRedution = (id) => {
    redution(id);
  };
  const onHandleIncrease = (id) => {
    increase(id);
  };
  const onHandlRemoveItemCart = (id) => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete item!",
    }).then((result) => {
      if (result.value) {
        removeItemCart(id);
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        }).fire({
          icon: "error",
          title: "Delete successfully",
        });
      }
    });
  };
  const onHandleClearCart = () => {
    Swal.fire({
      title: "Are you sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        clearCart();
        Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
        }).fire({
          icon: "error",
          title: "Add to Cart successf ully",
        });
      }
    });
  };
  if (cart.length == 0) {
    return (
      <div className="pt-5">
        <div className="container">
          <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
            <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
              Home
              <i
                className="fa fa-angle-right m-l-9 m-r-10"
                aria-hidden="true"
              />
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
                        <th className="text-center text-danger">
                          Nothings Product !
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
  } else {
    return (
      <div className="pt-5">
        {/* breadcrumb */}
        <div className="container">
          <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
            <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
              Home
              <i
                className="fa fa-angle-right m-l-9 m-r-10"
                aria-hidden="true"
              />
            </a>
            <span className="stext-109 cl4">Shoping Cart</span>
          </div>
        </div>
        {/* Shoping Cart */}
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-10 col-xl-10 m-lr-auto m-b-50">
              <div className="m-l-25 m-r--38 m-lr-0-xl">
                <div className="wrap-table-shopping-cart">
                  <table className="table-shopping-cart">
                    <tbody>
                      <tr className="table_head">
                        <th className="column-1">Product</th>
                        <th className="column-2" />
                        <th className="column-3">Price</th>
                        <th className="column-4">Quantity</th>
                        <th className="column-5">Total</th>
                        <th className="column-1"></th>
                      </tr>
                      {cart.map(
                        ({ id, name, image, price, quantity }, index) => (
                          <tr className="table_row" key={index}>
                            <td className="column-1">
                              <div className="how-itemcart1">
                                <img src={image} />
                              </div>
                            </td>
                            <td className="column-2">{name}</td>
                            <td className="column-3">$ {price}</td>
                            <td className="column-4">
                              <div className="wrap-num-product flex-w m-l-auto m-r-0">
                                <div
                                  className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m "
                                  onClick={() => onHandleRedution(id)}>
                                  <i className="fs-16 zmdi zmdi-minus text-danger" />
                                </div>
                                <div className="pt-2 txt-center num-product">
                                  {quantity}
                                </div>
                                <div
                                  className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                  onClick={() => onHandleIncrease(id)}>
                                  <i className="fs-16 zmdi zmdi-plus text-primary" />
                                </div>
                              </div>
                            </td>
                            <td className="column-5">$ {price * quantity}</td>
                            <td>
                              <button onClick={() => onHandlRemoveItemCart(id)}>
                                <i className="fas fa-times text-danger"></i>
                              </button>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex-w flex-sb-m bor15 p-t-18 p-b-15 p-lr-40 p-lr-15-sm">
                  <div
                    className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10 bg-danger"
                    onClick={() => onHandleClearCart()}>
                    Clear Cart
                  </div>
                  <Link
                    to="/check-out"
                    className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10 bg-warning">
                    Check Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ShoppingCart;
