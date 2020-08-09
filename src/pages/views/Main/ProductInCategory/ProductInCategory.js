import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
const ProductInCategory = ({ products, categories, onAddCart }) => {
  const { id } = useParams();
  const onHandleAddCart = (id) => {
    onAddCart(id);
  };
  const [vale_keyword, setKeyWord] = useState("");
  const getKeyWord = (e) => {
    console.log(e.target.value);
    setKeyWord(e.target.value);
  };
  return (
    <div>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92 pt-5"
        style={{ backgroundImage: 'url("../../dist/images/bg-01.jpg")' }}
      >
        <h2 className="ltext-105 cl0 txt-center">Shop</h2>
      </section>
      <div className="bg0 m-t-23 p-b-140 pt-5">
        <div className="container">
          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1"
                data-filter="*"
              >
                Cate
              </button>
            </div>

            {/* Search product */}
            <div className="panel-search w-full p-t-10 p-b-15">
              <div className="bor8 dis-flex p-l-15">
                <Link
                  to={`/search/${vale_keyword}`}
                  className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04"
                >
                  <i className="zmdi zmdi-search" />
                </Link>
                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15"
                  type="text"
                  name="keyword"
                  placeholder="Search"
                  onChange={getKeyWord}
                />
              </div>
            </div>
            {/* Filter */}
          </div>
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="row isotope-grid">
                {products.map((element, index) => {
                  if (element.cate_id == id) {
                    return (
                      <div
                        key={index}
                        className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item "
                      >
                        <div className="block2 border">
                          <div className="block2-pic hov-img0">
                            <img src={element.image} alt="IMG-PRODUCT" />
                            <Link
                              to={`/show/${element.id}`}
                              className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                            >
                              Quick View
                            </Link>
                          </div>
                          <div className="block2-txt flex-w flex-t p-t-14 p-3">
                            <div className="block2-txt-child1 flex-col-l ">
                              <Link to={`/show/${element.id}`} className="cl2">
                                <h5>{element.name}</h5>
                              </Link>
                              <span className="stext-105 cl3">
                                ${element.price_sale}
                                {"   "}
                                <s>${element.price}</s>
                              </span>
                            </div>
                            <div className="block2-txt-child2 flex-r p-t-3">
                              <button
                                onClick={() => onHandleAddCart(element.id)}
                                id="add-to-cart-{id}"
                                data-id={element.id}
                                data-name={element.name}
                                data-image={element.image}
                                data-price={element.price}
                                className="btn-addwish-b2 dis-block pos-relative
                        js-addwish-b2"
                              >
                                <i className="icon-heart1 dis-block trans-04 fas fa-shopping-cart text-primary"></i>
                                <i className="icon-heart2 dis-block trans-04 ab-t-l fas fa-shopping-cart"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <div className="bor17 of-hidden pos-relative">
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="keyword"
                    placeholder="Search"
                    onChange={getKeyWord}
                  />
                  <Link
                    to={`/search/${vale_keyword}`}
                    className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04"
                  >
                    <i className="zmdi zmdi-search" />
                  </Link>
                </div>
                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>
                  <ul>
                    {categories.map(({ id, cate_name }, index) => (
                      <li key={index} className="bor18">
                        <Link
                          to={`/shop/category/${id}`}
                          className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                        >
                          {cate_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-t-65">
                  <h4 className="mtext-112 cl2 p-b-33">Featured Products</h4>
                  <ul>
                    <li className="flex-w flex-t p-b-30">
                      <a
                        href="#"
                        className="wrao-pic-w size-214 hov-ovelay1 m-r-20"
                      >
                        <img
                          src="../../dist/images/product-min-01.jpg"
                          alt="PRODUCT"
                        />
                      </a>
                      <div className="size-215 flex-col-t p-t-8">
                        <a href="#" className="stext-116 cl8 hov-cl1 trans-04">
                          White Shirt With Pleat Detail Back
                        </a>
                        <span className="stext-116 cl6 p-t-20">$19.00</span>
                      </div>
                    </li>
                    <li className="flex-w flex-t p-b-30">
                      <a
                        href="#"
                        className="wrao-pic-w size-214 hov-ovelay1 m-r-20"
                      >
                        <img
                          src="../../dist/images/product-min-02.jpg"
                          alt="PRODUCT"
                        />
                      </a>
                      <div className="size-215 flex-col-t p-t-8">
                        <a href="#" className="stext-116 cl8 hov-cl1 trans-04">
                          Converse All Star Hi Black Canvas
                        </a>
                        <span className="stext-116 cl6 p-t-20">$39.00</span>
                      </div>
                    </li>
                    <li className="flex-w flex-t p-b-30">
                      <a
                        href="#"
                        className="wrao-pic-w size-214 hov-ovelay1 m-r-20"
                      >
                        <img
                          src="../../dist/images/product-min-03.jpg"
                          alt="PRODUCT"
                        />
                      </a>
                      <div className="size-215 flex-col-t p-t-8">
                        <a href="#" className="stext-116 cl8 hov-cl1 trans-04">
                          Nixon Porter Leather Watch In Tan
                        </a>
                        <span className="stext-116 cl6 p-t-20">$17.00</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-t-50">
                  <h4 className="mtext-112 cl2 p-b-27">Tags</h4>
                  <div className="flex-w m-r--5">
                    <a
                      href="#"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Fashion
                    </a>
                    <a
                      href="#"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Lifestyle
                    </a>
                    <a
                      href="#"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Denim
                    </a>
                    <a
                      href="#"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Streetstyle
                    </a>
                    <a
                      href="#"
                      className="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5"
                    >
                      Crafts
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Load more */}
          <div className="flex-c-m flex-w w-full p-t-45">
            <a
              href="#"
              className="flex-c-m stext-101 cl5 size-103 bg2 bor1 hov-btn1 p-lr-15 trans-04"
            >
              Load More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductInCategory.propTypes = {};

export default ProductInCategory;
