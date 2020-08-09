import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Category_API from "../../../../api/categoryApi";
import Pagination from "react-js-pagination";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
const Categories = ({ onRemoveCategory }) => {
  const [categories, setCategories] = useState([]);
  const [activePage, setAcTivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(1);
  useEffect(() => {
    getAllCategories();
  }, []);
  const getAllCategories = async () => {
    try {
      const response = await Category_API.getAllAdmin();
      setCategories(response.data.data);
      setItemsCountPerPage(response.data.per_page);
      setTotalItemsCount(response.data.total);
      setAcTivePage(response.data.current_page);
    } catch (error) {
      console.log("failed to request API CATEGORY: ", error);
    }
  };
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
        const newCategories = [...categories];
        newCategories.forEach((element, index) => {
          if (element.id == id) newCategories.splice(index, 1);
        });
        setCategories(newCategories);
        onRemoveCategory(id);
        Swal.fire("Xóa!", "Đã xóa thành công !", "success");
      }
    });
  };
  const handlePageChange = async (page_number) => {
    setAcTivePage(page_number);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/get_all_categories?page=" + page_number
      );
      setCategories(response.data.data);
      setItemsCountPerPage(response.data.per_page);
      setTotalItemsCount(response.data.total);
      setAcTivePage(response.data.current_page);
    } catch (error) {}
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
                        <Link
                          to={`/admin/category/edit/${id}`}
                          className="btn btn-outline"
                        >
                          <i className="far fa-edit text-warning"></i>
                        </Link>
                      </center>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="d-flex justify-content-end">
              <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
