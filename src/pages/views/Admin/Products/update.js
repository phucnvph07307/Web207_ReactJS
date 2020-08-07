import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { storage } from "../../../../firebase";
import Product_API from "../../../../api/productApi";
const UpdateProduct = ({ products, categories, onUpdateProduct }) => {
  const { id } = useParams();
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await Product_API.getAll();
      const result = data.find((elment) => elment.id == id);
      if (result) {
        setPrice(result.price ? result.price : 0);
        setPriceSale(result.price_sale ? result.price_sale : 0);
      }
    } catch (error) {
      console.log("failed to request API PRODUCT: ", error);
    }
  };

  const [price, setPrice] = useState(0);
  const [price_sale, setPriceSale] = useState(0);
  const [image, setImage] = useState("");
  const [short_desc, setDesc] = useState("");
  const [detail, setDetail] = useState("");

  const handleChangeImage = (event) => {
    let value = event.target.files[0];
    console.log("vừa thay đổi ảnh");
    setImage(value);
  };

  const handleChangePrice = (event) => {
    let value = event.target.value;
    setPrice(value);
  };
  const handleChangePriceSale = (event) => {
    let value = event.target.value;
    setPriceSale(value);
  };

  const callApiUpdate = async (id, data) => {
    try {
      const response = await Product_API.update(id, data);
      if (response.statusText === "OK" && response.status < 300) {
        Swal.fire({
          position: "bottom-center",
          icon: "success",
          title: "Sửa thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        onUpdateProduct(id, data);
        history.push("/admin/products");
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
      console.log("failed to request API UPDATE PRODUCT: ", error);
    }
  };
  const onSubmit = (data) => {
    Swal.showLoading();
    data.short_desc = short_desc;
    data.detail = detail;
    const params = {
      cate_id: data.cate_id,
      name: data.name,
      price: data.price,
      price_sale: data.price_sale,
      quantity: data.quantity,
      short_desc: data.short_desc,
      detail: data.detail,
      image: data.image.length ? data.image : data.imageOrigin,
    };
    console.log(data.image);
    if (data.image.length) {
      let file = data.image[0];
      let storageRef = storage.ref(`images/${file.name}`);
      storageRef.put(file).then(function () {
        storageRef.getDownloadURL().then((url) => {
          params.image = url;
          callApiUpdate(id, params);
        });
      });
    } else {
      callApiUpdate(id, params);
    }
  };

  return (
    <div>
      {products.map((el) => {
        if (el.id == id) {
          return (
            <div className="card shadow mb-4" key={el.id}>
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Update Product
                </h6>
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
                            defaultValue={el.name}
                            ref={register({ required: true })}
                          />
                          <span className="text-danger">
                            {errors.name && "* Vui lòng điền tên sản phẩm"}
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
                            })}
                          >
                            <option value="">... Choose a category ...</option>
                            {categories.map((elment, index) => (
                              <option
                                key={index}
                                value={elment.id}
                                selected={el.cate_id == elment.id}
                              >
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
                            defaultValue={el.price}
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
                            defaultValue={el.price_sale}
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
                            defaultValue={el.quantity}
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
                            type="file"
                            name="image"
                            onChange={handleChangeImage}
                            ref={register({
                              validate: (value) => {
                                if (value.length > 0) {
                                  let patternImage = /\S{1,}[^\.][\.][p|j][n|p][g|e]g?$/g;
                                  let checkImage = patternImage.test(
                                    value[0].name
                                  );
                                  return checkImage;
                                }
                              },
                            })}
                          />
                          <span className="text-danger">
                            {errors.image?.type === "validate" &&
                              "* Vui lòng upload Image (.png, .jpg, jpeg)"}
                          </span>
                          <input
                            type="hidden"
                            name="imageOrigin"
                            defaultValue={el.image}
                            ref={register()}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <img
                          src={image ? image : el.image}
                          width="300px"
                          className="bor10"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Description:</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={el.short_desc}
                        onInit={(editor) => {
                          const data = editor.getData();
                          setDesc(data);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDesc(data);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Detail:</label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={el.detail}
                        onInit={(editor) => {
                          const data = editor.getData();
                          setDetail(data);
                        }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setDetail(data);
                        }}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

UpdateProduct.propTypes = {};

export default UpdateProduct;
