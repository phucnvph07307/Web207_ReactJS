import React, { useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
const Home = ({ products, onAddCart }) => {
  const [cart, setCart] = useState([]);
  const onHandleAddCart = (id) => {
    onAddCart(id);
  };
  return (
    <main id="content" className="main-content-wrapper">
      {/* Slider */}
      <section className="section-slide">
        <div className="wrap-slick1">
          <div className="slick1">
            <div
              className="item-slick1"
              style={{
                backgroundImage: "url(../../dist/images/slide-01.jpg)",
              }}
            >
              <div className="container h-full">
                <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="fadeInDown"
                    data-delay={0}
                  >
                    <span className="ltext-101 cl2 respon2">
                      Women Collection 2018
                    </span>
                  </div>
                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="fadeInUp"
                    data-delay={800}
                  >
                    <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                      NEW SEASON
                    </h2>
                  </div>
                  <div
                    className="layer-slick1 animated visible-false"
                    data-appear="zoomIn"
                    data-delay={1600}
                  >
                    <a
                      href="product.html"
                      className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner */}
      <div className="sec-banner bg0 p-t-80 p-b-50">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              {/* Block1 */}
              <div className="block1 wrap-pic-w">
                <img src="../../dist/images/banner-01.jpg" alt="IMG-BANNER" />
                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Women
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      Spring 2018
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              {/* Block1 */}
              <div className="block1 wrap-pic-w">
                <img src="../../dist/images/banner-02.jpg" alt="IMG-BANNER" />
                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Men
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      Spring 2018
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-xl-4 p-b-30 m-lr-auto">
              {/* Block1 */}
              <div className="block1 wrap-pic-w">
                <img src="../../dist/images/banner-03.jpg" alt="IMG-BANNER" />
                <a
                  href="product.html"
                  className="block1-txt ab-t-l s-full flex-col-l-sb p-lr-38 p-tb-34 trans-03 respon3"
                >
                  <div className="block1-txt-child1 flex-col-l">
                    <span className="block1-name ltext-102 trans-04 p-b-8">
                      Accessories
                    </span>
                    <span className="block1-info stext-102 trans-04">
                      New Trend
                    </span>
                  </div>
                  <div className="block1-txt-child2 p-b-4 trans-05">
                    <div className="block1-link stext-101 cl0 trans-09">
                      Shop Now
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product */}
      <section className="bg0 p-t-23 p-b-140">
        <div className="container">
          <div className="p-b-10">
            <h3 className="ltext-103 cl5">Product Overview</h3>
          </div>

          <div className="row isotope-grid">
            {products.map(({ id, name, image, price }, index) => (
              <div
                key={index}
                className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item "
              >
                <div className="block2">
                  <div className="block2-pic hov-img0">
                    <img src={image} alt="IMG-PRODUCT" />
                    <Link
                      to={`/show/${id}`}
                      className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                    >
                      Quick View
                    </Link>
                  </div>
                  <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l ">
                      <Link
                        to={`/show/${id}`}
                        className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                      >
                        {name}
                      </Link>
                      <span className="stext-105 cl3">${price}</span>
                    </div>
                    <div className="block2-txt-child2 flex-r p-t-3">
                      <button
                        onClick={() => onHandleAddCart(id)}
                        id="add-to-cart-{id}"
                        data-id={id}
                        data-name={name}
                        data-image={image}
                        data-price={price}
                        className="btn-addwish-b2 dis-block pos-relative
                        js-addwish-b2"
                      >
                        <i className="icon-heart1 dis-block trans-04 fas fa-shopping-cart"></i>
                        <i className="icon-heart2 dis-block trans-04 ab-t-l fas fa-shopping-cart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

Home.propTypes = {};

export default Home;
