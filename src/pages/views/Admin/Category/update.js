import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { storage } from "../../../../firebase";
import Category_API from "../../../../api/categoryApi";
const UpdateCategory = ({ categories, onUpdateCategory }) => {
  const { id } = useParams();
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();
  const [desc, setDesc] = useState("");
  const [cates, setCates] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    if (categories.length > 0) {
      const result = categories.find((elment) => elment.id == id);
      if (result) {
        setDesc(result.description);
        setCates(result);
      }
    } else {
      getAllCategories(id);
    }
  }, []);

  const getAllCategories = async (id) => {
    try {
      const { data } = await Category_API.getAll();
      const result = await data.find((elment) => elment.id == id);
      if (result) {
        setDesc(result.description);
        setCates(result);
      }
    } catch (error) {
      console.log("failed to request API : ", error);
    }
  };

  const callApiUpdate = async (id, data) => {
    try {
      const response = await Category_API.update(id, data);
      if (response.statusText === "OK" && response.status < 300) {
        Swal.fire({
          position: "bottom-center",
          icon: "success",
          title: "Sửa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        onUpdateCategory(id, data);
        history.push("/admin/category");
      } else {
        Swal.fire({
          position: "bottom-center",
          icon: "warning",
          title: "Sửa thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("failed to request API UPDATE CATEGORY: ", error);
    }
  };
  const onSubmit = (data) => {
    data.description = desc;
    callApiUpdate(id, data);
  };

  return (
    <div>
      <div className="card shadow mb-4" key={cates.id}>
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Update Category</h6>
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
                      defaultValue={cates.cate_name}
                      ref={register({ required: true })}
                    />
                    <span className="text-danger">
                      {errors.cate_name && "* Vui lòng điền tên danh mục"}
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
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

UpdateCategory.propTypes = {};

export default UpdateCategory;
