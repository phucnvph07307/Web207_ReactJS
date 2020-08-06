import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
const ProductsManager = ({ categories, products, onRemove }) => {
  const removeHandle = (id) => {
    Swal.fire({
      title: "Bạn chắc chắn muốn xóa?",
      text: "Cân nhắc trước khi xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý ",
    }).then((result) => {
      if (result.value) {
        onRemove(id);
        Swal.fire("Xóa!", "Đã xóa thành công !", "success");
      }
    });
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">List Products</h1>
        <Link
          to="/admin/product/create"
          className="d-none d-sm-inline-block btn btn-sm btn-outline-info shadow-sm"
        >
          New Product
        </Link>
      </div>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Price SALE</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">
                    <center>Action</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map(
                  (
                    { id, name, cate_id, image, price, price_sale, quantity },
                    index
                  ) => (
                    <tr key={index}>
                      <th scope="row">{++index}</th>
                      <td>{name}</td>
                      <td>
                        {categories.map((elment, index) => {
                          if (cate_id == elment.id) {
                            return elment.cate_name;
                          }
                        })}
                      </td>
                      <td>
                        <img src={image} alt="" width="50" />
                      </td>

                      <td>${price}</td>
                      <td>${price_sale}</td>

                      <td>
                        {quantity
                          ? ReactHtmlParser(
                              '<h6 class="font-weight-bold text-primary">' +
                                quantity +
                                "</h6>"
                            )
                          : ReactHtmlParser(
                              '<span class="btn btn-google btn-block">Hết Hàng</span>'
                            )}
                      </td>
                      <td>
                        <center>
                          <button
                            className="btn btn-outline"
                            onClick={() => removeHandle(id)}
                          >
                            <i className="fas fa-trash-alt text-danger"></i>
                          </button>
                          <Link
                            className="btn btn-outline"
                            to={`/admin/products/edit/${id}`}
                          >
                            <i className="far fa-edit text-warning"></i>
                          </Link>
                          <Link
                            className="btn btn-outline"
                            to={`/admin/products/${id}`}
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

ProductsManager.propTypes = {};

export default ProductsManager;
