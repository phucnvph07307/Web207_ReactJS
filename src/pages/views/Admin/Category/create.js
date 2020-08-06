import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Category_API from "../../../../api/categoryApi";

const CreateCategory = ({ onCreateCategory }) => {
  useEffect(() => {}, []);
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();
  const [desc, setDesc] = useState("");

  const onSubmit = async (data) => {
    data.description = desc;

    const response = await Category_API.create(data);
    console.log(response);
    if (response.statusText === "Created" && response.status < 300) {
      Swal.fire({
        position: "bottom-center",
        icon: "success",
        title: "Thêm thành công",
        showConfirmButton: false,
        timer: 1500,
      });

      onCreateCategory(response.data);
      history.push("/admin/category");
    } else {
      Swal.fire({
        position: "bottom-center",
        icon: "warning",
        title: "Thêm thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">New Category</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Name Category (*):</label>
                  <input
                    type="text"
                    name="cate_name"
                    className="form-control"
                    ref={register({
                      required: true,
                      pattern: /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/g,
                    })}
                    placeholder="Enter Name Product"
                  />
                  <span className="text-danger">
                    {errors.cate_name?.type === "required" &&
                      "* Vui lòng nhập tên danh mục"}
                    {errors.cate_name?.type === "pattern" &&
                      "* Vui lòng nhập tên danh mục"}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label>Description</label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={desc}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setDesc(data);
                    }}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
