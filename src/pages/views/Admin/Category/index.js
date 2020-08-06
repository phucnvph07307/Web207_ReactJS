import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Swal from "sweetalert2";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const Categories = ({ categories, onRemoveCategory }) => {
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
        onRemoveCategory(id);
        Swal.fire("Xóa!", "Đã xóa thành công !", "success");
      }
    });
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">List Categories</h1>
        <Link
          to="/admin/category/create"
          className="d-none d-sm-inline-block btn btn-sm btn-outline-info shadow-sm"
        >
          New Category
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
                  <th scope="col">Description</th>
                  <th scope="col">
                    <center>Action</center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map(({ id, cate_name, description }, index) => (
                  <tr key={index}>
                    <th>{++index}</th>
                    <td>{cate_name}</td>
                    <td>{ReactHtmlParser(description)}</td>
                    <td>
                      <center>
                        <button
                          className="btn btn-outline"
                          onClick={() => removeHandle(id)}
                        >
                          <i className="fas fa-trash-alt text-danger"></i>
                        </button>
                        <Link className="btn btn-outline">
                          <i className="far fa-edit text-warning"></i>
                        </Link>
                      </center>
                    </td>
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

export default Categories;
