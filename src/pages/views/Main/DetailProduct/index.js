import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
const DetailProduct = ({ products, categories, onAddCart }) => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [valueInput, setValueInput] = useState(1);
  const onHandeChange = (e) => {
    setValueInput(e.target.value);
  };
  const onHanldeAddCart = (id, quantity) => {
    onAddCart(id, quantity);
  };
  const tang = () => {
    setValueInput(valueInput + 1);
  };
  const giam = () => {
    const res = valueInput > 1 ? valueInput - 1 : valueInput;
    setValueInput(res);
  };
  return (
    <div className="pt-5">
      {products.map((elment, index) => {
        if (elment.id == id) {
          return (
            <div key={index}>
              <div className="container">
                <div className="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                  <a
                    href="index.html"
                    className="stext-109 cl8 hov-cl1 trans-04"
                  >
                    Home
                    <i
                      className="fa fa-angle-right m-l-9 m-r-10"
                      aria-hidden="true"
                    />
                  </a>
                  <a
                    href="product.html"
                    className="stext-109 cl8 hov-cl1 trans-04"
                  >
                    Detail Product
                    <i
                      className="fa fa-angle-right m-l-9 m-r-10"
                      aria-hidden="true"
                    />
                  </a>
                  <span className="stext-109 cl4">{elment.name}</span>
                </div>
              </div>
              <section className="sec-product-detail bg0 p-t-65 p-b-60">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 col-lg-7 p-b-30">
                      <div className="p-l-25 p-r-30 p-lr-0-lg">
                        <div className="wrap-slick3 flex-sb flex-w">
                          <div className="wrap-slick3-dots" />
                          <div className="wrap-slick3-arrows flex-sb-m flex-w" />
                          <div className="slick3 gallery-lb">
                            <div
                              className="item-slick3"
                              data-thumb={elment.image}
                            >
                              <div className="wrap-pic-w pos-relative border">
                                <img src={elment.image} alt="IMG-PRODUCT" />
                                <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04">
                                  <i className="fa fa-expand" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-5 p-b-30">
                      <div className="p-r-50 p-t-5 p-lr-0-lg">
                        <span className=" cl2 js-name-detail p-b-14">
                          Categories:{"  "}
                          {categories.map((el, index) => {
                            if (elment.cate_id == el.id) {
                              return el.cate_name;
                            }
                          })}
                        </span>
                        <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                          {elment.name}
                        </h4>

                        <span className="mtext-106 cl2">
                          $ {elment.price_sale}
                          {"   "}
                          <s className="text-danger">$ {elment.price}</s>
                        </span>
                        <p className="stext-102 cl3 p-t-23">
                          {ReactHtmlParser(elment.short_desc)}
                        </p>
                        {/*  */}
                        <div className="p-t-33">
                          <div
                            className="flex-w"
                            style={{ "padding-left": "100px" }}
                          >
                            <div className="size-203 flex-c-m respon6">
                              Size:
                              <button className="btn btn-circle ">
                                <b>S</b>
                              </button>
                              <button className="btn btn-circle ">
                                <b>M</b>
                              </button>
                              <button className="btn btn-circle ">
                                <b>L</b>
                              </button>
                              <button className="btn btn-circle ">
                                <b>XL</b>
                              </button>
                              <button className="btn btn-circle ">
                                <b>XXL</b>
                              </button>
                            </div>
                          </div>
                          <div
                            className="flex-w"
                            style={{ "padding-left": "80px" }}
                          >
                            <div className="size-203 flex-c-m respon6">
                              Color:
                              <button className="btn btn-primary btn-circle btn-sm">
                                <i className="fs-16 zmdi zmdi-minus" />
                              </button>
                              <button className="btn btn-warning btn-circle btn-sm">
                                <i className="fs-16 zmdi zmdi-minus" />
                              </button>
                              <button className="btn btn-success btn-circle btn-sm">
                                <i className="fs-16 zmdi zmdi-minus" />
                              </button>
                              <button className="btn btn-info btn-circle btn-sm">
                                <i className="fs-16 zmdi zmdi-minus" />
                              </button>
                              <button className="btn btn-danger btn-circle btn-sm">
                                <i className="fs-16 zmdi zmdi-minus" />
                              </button>
                            </div>
                          </div>
                          <hr />
                          <div className="flex-w flex-r-m p-b-10">
                            <div className="size-204 flex-w flex-m respon6-next">
                              <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                <div
                                  onClick={giam}
                                  className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                                >
                                  <i className="fs-16 zmdi zmdi-minus" />
                                </div>
                                <input
                                  className="mtext-104 cl3 txt-center num-product"
                                  type="number"
                                  name="num-product"
                                  value={valueInput}
                                  onChange={onHandeChange}
                                />
                                <div
                                  onClick={tang}
                                  className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                                >
                                  <i className="fs-16 zmdi zmdi-plus" />
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  onHanldeAddCart(elment.id, valueInput)
                                }
                                className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                        {/*  */}
                        <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                          <div className="flex-m bor9 p-r-10 m-r-11">
                            <a
                              href="#"
                              className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                              data-tooltip="Add to Wishlist"
                            >
                              <i className="zmdi zmdi-favorite" />
                            </a>
                          </div>
                          <a
                            href="#"
                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                            data-tooltip="Facebook"
                          >
                            <i className="fa fa-facebook" />
                          </a>
                          <a
                            href="#"
                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                            data-tooltip="Twitter"
                          >
                            <i className="fa fa-twitter" />
                          </a>
                          <a
                            href="#"
                            className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                            data-tooltip="Google Plus"
                          >
                            <i className="fa fa-google-plus" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bor10 m-t-50 p-t-43 p-b-40">
                    {/* Tab01 */}
                    <div className="tab01">
                      {/* Nav tabs */}
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item p-b-10">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#description"
                            role="tab"
                          >
                            Description
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content p-t-43">
                        <div
                          className="tab-pane fade show active"
                          id="description"
                          role="tabpanel"
                        >
                          <div className="how-pos2 p-lr-15-md">
                            <p className="stext-102 cl6">
                              {ReactHtmlParser(elment.detail)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
                  <span className="stext-107 cl6 p-lr-25">SKU: JAK-01</span>
                </div>
              </section>
            </div>
          );
        }
      })}
    </div>
  );
};

DetailProduct.propTypes = {};

export default DetailProduct;
