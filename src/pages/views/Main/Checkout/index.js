import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Checkout = ({ cart, clearCart }) => {
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    const shoppingCartItems = JSON.parse(
      localStorage["shopping-cart-items"].toString()
    );
    if (shoppingCartItems.length == 0) {
      history.push("/shopping-cart");
    }
  });

  const getTotal = (array = []) => {
    return array.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);
  };
  const onSubmit = (data) => {
    addInvoice(
      data.customer_name,
      data.customer_phone_number,
      data.customer_email,
      data.customer_address,
      data.message,
      data.total_price
    );
  };

  const addInvoice = (name, phone, email, address, message, total) => {
    var UrlPostInvoice = "http://localhost:8000/api/invoice/";

    var params = {
      customer_name: name,
      customer_phone_number: phone,
      customer_email: email,
      customer_address: address,
      message: message,
      total_price: total,
      payment_method: 1,
    };

    axios.post(UrlPostInvoice, params).then((response) => {
      if (response.statusText === "Created" && response.status < 300) {
        addInvoiceDetail(response.data.id);
      }
    });
  };
  const addInvoiceDetail = (invoice_id) => {
    var UrlPostInvoiceDetail = "http://localhost:8000/api/invoice_detail/";
    const shoppingCartItems = JSON.parse(
      localStorage["shopping-cart-items"].toString()
    );

    shoppingCartItems.forEach((element) => {
      let params = {
        invoice_id: invoice_id,
        product_id: element.id,
        quantity: element.quantity,
        unit_price: element.price,
      };
      axios.post(UrlPostInvoiceDetail, params).then((response) => {
        if (response.statusText === "Created" && response.status < 300) {
          Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          }).fire({
            icon: "success",
            title: "Orders successfully",
          });
          history.push("/shopping-cart");
          clearCart();
        }
      });
    });
  };

  if (cart != null) {
    return (
      <div className="pt-5" style={{ height: "800px" }}>
        <div className="container">
          <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
            <a href="index.html" className="stext-109 cl8 hov-cl1 trans-04">
              Home
              <i
                className="fa fa-angle-right m-l-9 m-r-10"
                aria-hidden="true"
              />
            </a>
            <span className="stext-109 cl4">Check Out</span>
          </div>
        </div>
        {/* Shoping Cart */}
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-5 bor10 pt-3">
              <h4 className="mtext-109 cl2 p-b-30 text-center">
                SHOPPING CART
              </h4>
              <div className="flex-w flex-r bor12 p-b-13 ">
                <div className="size-208 ">
                  <span className="stext-110 cl2">Total:</span>
                </div>
                <div className="pr-4 ">
                  <span className="mtext-110 cl2">$ {getTotal(cart)}</span>
                </div>
              </div>
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(({ id, name, image, price, quantity }, index) => (
                    <tr className="table_row" key={index}>
                      <td>
                        <div className="how-itemcart1">
                          <img src={image} />
                        </div>
                      </td>
                      <td>{name}</td>
                      <td>$ {price}</td>
                      <td>{quantity}</td>
                      <td>$ {price * quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-1 pt-3"></div>
            <div className="col-sm-12 col-md-12 col-lg-6 bor10 pt-3">
              <h4 className="mtext-109 cl2 p-b-30 text-center">Orders</h4>
              <div className="">
                <div className="">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6 form-group pr-lg-2">
                        <input
                          type="text"
                          className="form-control"
                          name="customer_name"
                          placeholder="Enter Name"
                          ref={register({
                            required: true,
                            pattern: {
                              value: /^([A-Z][a-z]+([ ]?[a-z]?['-]?[A-Z][a-z]+)*)$/,
                            },
                          })}
                        />
                        <span className="text-danger">
                          {errors.customer_name?.type === "required" &&
                            "* Vui lòng nhập Họ và Tên"}
                          {errors.customer_name?.type === "pattern" &&
                            "* Vui lòng nhập Họ và Tên"}
                        </span>
                      </div>
                      <div className="col-lg-6 form-group pl-lg-2">
                        <input
                          type="email"
                          className="form-control"
                          name="customer_email"
                          placeholder="Enter Name"
                          ref={register({
                            required: true,
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            },
                          })}
                        />
                        <span className="text-danger">
                          {errors.customer_email?.type === "required" &&
                            "* Vui lòng nhập Email"}
                          {errors.customer_email?.type === "pattern" &&
                            "* Vui lòng nhập Email hợp lệ"}
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="customer_phone_number"
                        placeholder="Enter Phone"
                        ref={register({
                          required: true,
                          pattern: {
                            value: /^(09|01|03|08[2|4|6|8|9])+([0-9]{8,9})$/,
                          },
                        })}
                      />
                      <span className="text-danger">
                        {errors.customer_phone_number?.type === "required" &&
                          "* Vui lòng nhập Số điện thoại"}
                        {errors.customer_phone_number?.type === "pattern" &&
                          "* Vui lòng nhập Số điện thoại hợp lệ"}
                      </span>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="customer_address"
                        placeholder="Enter Address"
                        ref={register({
                          required: true,
                        })}
                      />
                      <span className="text-danger">
                        {errors.customer_address?.type === "required" &&
                          "* Vui lòng nhập Địa chỉ"}
                      </span>
                    </div>
                    <div className="form-group">
                      <textarea
                        name="message"
                        className="form-control"
                        placeholder="Enter Message"
                        ref={register()}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="hidden"
                        className="form-control"
                        name="total_price"
                        value={getTotal(cart)}
                        ref={register()}
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex-c-m stext-101 cl2 size-119 bg8 bor13 hov-btn3 p-lr-15 trans-04 pointer m-tb-10 bg-warning"
                    >
                      Order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Checkout;
