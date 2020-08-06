import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CreateProduct = ({ categories, onCreateProduct }) => {
  useEffect(() => {}, []);
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();

  const [price, setPrice] = useState(0);
  const [price_sale, setPriceSale] = useState(0);
  const [image, setImage] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAACNCAMAAAC3+fDsAAAAIVBMVEXl5eX////w8PD8/Pzt7e319fX5+fnn5+fm5uby8vLq6uqMWbp9AAAELklEQVR4nO2d22KjMAwFyz3w/x+8JS2+AIUjZ2tSPPNaKPGgCCGM8/EBAAAAAAAAAAAAAAAAAPDf6CuN/uoP+oeZRMdVNV39Uf8ujSy5ufqj/lla2XFVtVd/2DdkarcM6430QCaU99jztL561QbHVVVfMo63RpFsCWRCeQdBsi2QCeUtgmSj46q6ZiRvzLnk0Sx5vGgsb8up5IfZcVU9rhrNm3Iq2R7IhPKaPUdd8PchwXFVbSrtslnr6ce4+9AlSe5+OFqhBGaavt60d9ICmVCOWQR39a6XtECm5RnzFLztVnyjtzjX0PIMaNujekvt1RPK6VhanGvqnfbeDkVH/GMaj8O4mXnhJCxcPdCrGNojwU0/ttOSxIfpc9tXXBfZsxva7shZM+59v6cx2XNxkqf6JCi7nzPolFjsFSX5LAXPio/vMIYkzaVIPk7BC/35TdyQUPGVIPkkBXu0h9D2mu/ukqdaFCyF8RcPazDfWbKQggMsTTVj//nGkm0V1/rJ6OdX4LsMafpu07mzPXdF8hdxOh42NXEzxsnElJiRvHU87WeZPgpni2Ukz4S54uCyFl0aDRkDyVV8zTt2F54N/eqH5LgtfHZHF54PuXZBcjSD4txb77eWZ2sgOUwBSmwGxtSLH5J76x6BMjFhINkXZmqHzZ8W8Rls8ZK9Mb1a8DO0tFAuXrILZMsUF1cva6FcumQ/fkszqbftVbpkV1rYusTuNly67ytdsqt6bT1iF8pSkilcsk1WgEvlxtL6biiSXZ1gnQZu2rFwya1l411vSi4vXLKbJGR07JO50sAoXPKiyj591n0HkKyO3vquZFD7WQ5zP4TRu+LC/vqTaywL5QWSn9hnXyH5iUWyfe6VZVckP0FyIqSLDFgu+y+8wI5kdfSUcIn87s2I6xAJ2xYueVFlX4thOYpyQ164ZHdzbC0v3CWTBtEprkZIXoNIqUsKl+yGb80XQ9JR7ofUInaybJWy+wZIV8zSJbty11ZfuHMjFdilS/bjt4Ryl3qQ22F9rUx37KVpEwmKl+wFpKyfbJ6ieDfEZ6M+lNUyzk+FE2fEIDkwoKXl7pVD3A31KX8gTbEcbK727pAcvV92ri1Y2FBO4kj+dBC8NHKWZdukA2Qfezb0SUHh60+HSy1EL/LpPSUkry0fFBnR+9eGmxckP4mXCKj3dm3iV9wtN4hI3rP8Ma1WyWjWKxOZ+klI/mazWuHQjl0/043bFShtPX4kOxP6IrLWdYiQ7FF/B8e8CBGSAzppnXr7RBgkR5z/fMhu5YFkm4/jnNGm/dNMI76AxKU116sNebYrEyE5fZ3Y9Q8LzNjWP0OyJrqbF/edmeaC+aX/heQMIDkDSM4AkjOA5AwgOQNIzgCSM4DkDCA5B1er+D2m+l0o+refAAAAAAAAAAAAAAAAAAAAAAAgJ/8A5lcyXpWOPpwAAAAASUVORK5CYII="
  );
  const [desc, setDesc] = useState("");
  const [detail, setDetail] = useState("");
  const handleChangePrice = (event) => {
    let value = event.target.value;
    setPrice(value);
  };
  const handleChangePriceSale = (event) => {
    let value = event.target.value;
    setPriceSale(value);
  };
  const handleChangeImgae = (event) => {
    let value = event.target.value;
    setImage(value);
  };

  const onSubmit = (data) => {
    data.short_desc = desc;
    data.detail = detail;

    axios
      .post("http://127.0.0.1:8000/api/product", data)
      .then(function (response) {
        console.log({ response });
        if (response.statusText === "Created" && response.status < 300) {
          Swal.fire({
            position: "bottom-center",
            icon: "success",
            title: "Thêm thành công",
            showConfirmButton: false,
            timer: 1500,
          });

          onCreateProduct({
            ...data,
            id: response.data.id,
          });

          history.push("/admin/products");
        } else {
          Swal.fire({
            position: "bottom-center",
            icon: "warning",
            title: "Thêm thất bại",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary">New Product</h6>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Name Product (*):</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    ref={register({
                      required: true,
                      pattern: /^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!]{2,}$/g,
                    })}
                    placeholder="Enter Name Product"
                  />
                  <span className="text-danger">
                    {errors.name?.type === "required" &&
                      "* Vui lòng nhập tên sản phẩm"}
                    {errors.name?.type === "pattern" &&
                      "* Vui lòng nhập tên sản phẩm"}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Categories (*):</label>
                  <select
                    name="cate_id"
                    className="form-control"
                    ref={register({
                      required: true,
                    })}>
                    <option value="">... Choose a category ...</option>

                    {categories.map((elment, index) => (
                      <option key={index} value={elment.id}>
                        {elment.cate_name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger">
                    {errors.cate_id?.type === "required" &&
                      "* Vui lòng Danh mục"}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Price (*):</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    onChange={handleChangePrice}
                    ref={register({
                      required: true,
                      min: 0,
                      validate: (value) =>
                        parseInt(value, 10) > parseInt(price_sale, 10),
                    })}
                  />
                  <span className="text-danger">
                    {errors.price?.type === "required" &&
                      "* Vui lòng nhập giá sản phẩm"}
                    {errors.price?.type === "min" &&
                      "* Vui lòng nhập giá lớn hơn 0"}
                    {errors.price?.type === "validate" &&
                      "* Vui lòng nhập giá lớn hơn giá sale"}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Price Sale (*):</label>
                  <input
                    type="number"
                    name="price_sale"
                    className="form-control"
                    onChange={handleChangePriceSale}
                    ref={register({
                      required: true,
                      min: 0,
                      validate: (value) =>
                        parseInt(value, 10) < parseInt(price, 10),
                    })}
                  />
                  <span className="text-danger">
                    {errors.price_sale?.type === "required" &&
                      "* Vui lòng nhập giá sale "}
                    {errors.price_sale?.type === "min" &&
                      "* Vui lòng nhập giá sale lớn hơn 0"}
                    {errors.price_sale?.type === "validate" &&
                      "* Vui lòng nhập giá sale nhỏ hơn giá gốc"}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>Số lượng (*):</label>
                  <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    ref={register({ required: true, min: 1 })}
                  />
                  <span className="text-danger">
                    {errors.quantity?.type === "required" &&
                      "* Vui lòng nhập giá số lượng "}
                    {errors.quantity?.type === "min" &&
                      "* Vui lòng nhập giá số lượng "}
                  </span>
                </div>
                <div className="form-group">
                  <label>Url Image (*):</label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    onChange={handleChangeImgae}
                    ref={register({ required: true })}
                  />
                  <span className="text-danger">
                    {errors.image && "* Vui lòng điền url Image"}
                  </span>
                </div>
              </div>
              <div className="col-6">
                <img src={image} />
              </div>
            </div>

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
            <div className="form-group">
              <label>Detail</label>
              <CKEditor
                editor={ClassicEditor}
                data={detail}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDetail(data);
                }}
              />
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

CreateProduct.propTypes = {};

export default CreateProduct;
