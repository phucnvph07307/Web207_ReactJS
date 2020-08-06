import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "../../../dist/vendor/bootstrap/css/bootstrap.min.css";
import "../../../dist/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
import "../../../dist/fonts/iconic/css/material-design-iconic-font.min.css";
import "../../../dist/fonts/linearicons-v1.0.0/icon-font.min.css";
import "../../../dist/vendor/animate/animate.css";
import "../../../dist/vendor/css-hamburgers/hamburgers.min.css";
import "../../../dist/vendor/animsition/css/animsition.min.css";

import "../../../dist/vendor/select2/select2.min.css";
import "../../../dist/vendor/daterangepicker/daterangepicker.css";
import "../../../dist/vendor/slick/slick.css";
import "../../../dist/vendor/MagnificPopup/magnific-popup.css";
import "../../../dist/vendor/perfect-scrollbar/perfect-scrollbar.css";

import "../../../dist/css/main.css";
import "../../../dist/css/util.css";
const Header = ({ cart }) => {
  return (
    <header>
      {/* Header desktop */}
      <div className="container-menu-desktop">
        {/* Topbar */}
        <div className="top-bar">
          <div className="content-topbar flex-sb-m h-full container">
            <div className="left-top-bar">
              Free shipping for standard order over $100
            </div>
            <div className="right-top-bar flex-w h-full">
              <a href="#" className="flex-c-m trans-04 p-lr-25">
                Help &amp; FAQs
              </a>
              <a href="#" className="flex-c-m trans-04 p-lr-25">
                My Account
              </a>
              <a href="#" className="flex-c-m trans-04 p-lr-25">
                EN
              </a>
              <a href="#" className="flex-c-m trans-04 p-lr-25">
                USD
              </a>
            </div>
          </div>
        </div>
        <div className="wrap-menu-desktop">
          <nav className="limiter-menu-desktop container">
            {/* Logo desktop */}
            <Link to="/" className="logo">
              <img src="../../dist/images/icons/logo-01.png" alt="IMG-LOGO" />
            </Link>
            {/* Menu desktop */}
            <div className="menu-desktop">
              <ul className="main-menu">
                <li className="active-menu">
                  <Link to="/">Home</Link>
                </li>

                <li className="label1" data-label1="hot">
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            {/* Icon header */}
            <div className="wrap-icon-header flex-w flex-r-m">
              <div className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-modal-search">
                <i className="zmdi zmdi-search" />
              </div>
              <Link to="/shopping-cart">
                <div
                  className={
                    cart.length
                      ? "icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                      : "icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 js-show-cart"
                  }
                  data-notify={cart.length}
                >
                  <i className="zmdi zmdi-shopping-cart" />
                </div>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      {/* Header Mobile */}
      <div className="wrap-header-mobile">
        {/* Logo moblie */}
        <div className="logo-mobile">
          <a href="index.html">
            <img src="../../dist/images/icons/logo-01.png" alt="IMG-LOGO" />
          </a>
        </div>
        {/* Icon header */}
        <div className="wrap-icon-header flex-w flex-r-m m-r-15">
          <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 js-show-modal-search">
            <i className="zmdi zmdi-search" />
          </div>
          <div
            className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
            data-notify={2}
          >
            <i className="zmdi zmdi-shopping-cart" />
          </div>
          <a
            href="#"
            className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti"
            data-notify={0}
          >
            <i className="zmdi zmdi-favorite-outline" />
          </a>
        </div>
        {/* Button show menu */}
        <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </div>
      </div>
      {/* Menu Mobile */}
      <div className="menu-mobile">
        <ul className="topbar-mobile">
          <li>
            <div className="left-top-bar">
              Free shipping for standard order over $100
            </div>
          </li>
          <li>
            <div className="right-top-bar flex-w h-full">
              <a href="#" className="flex-c-m p-lr-10 trans-04">
                Help &amp; FAQs
              </a>
              <a href="#" className="flex-c-m p-lr-10 trans-04">
                My Account
              </a>
              <a href="#" className="flex-c-m p-lr-10 trans-04">
                EN
              </a>
              <a href="#" className="flex-c-m p-lr-10 trans-04">
                USD
              </a>
            </div>
          </li>
        </ul>
        <ul className="main-menu-m">
          <li>
            <a href="index.html">Home</a>
            <ul className="sub-menu-m">
              <li>
                <a href="index.html">Homepage 1</a>
              </li>
              <li>
                <a href="home-02.html">Homepage 2</a>
              </li>
              <li>
                <a href="home-03.html">Homepage 3</a>
              </li>
            </ul>
            <span className="arrow-main-menu-m">
              <i className="fa fa-angle-right" aria-hidden="true" />
            </span>
          </li>
          <li>
            <a href="product.html">Shop</a>
          </li>
          <li>
            <a
              href="shoping-cart.html"
              className="label1 rs1"
              data-label1="hot"
            >
              Features
            </a>
          </li>
          <li>
            <a href="blog.html">Blog</a>
          </li>
          <li>
            <a href="about.html">About</a>
          </li>
          <li>
            <a href="contact.html">Contact</a>
          </li>
        </ul>
      </div>
      {/* Modal Search */}
      <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
        <div className="container-search-header">
          <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
            <img src="../../dist/images/icons/icon-close2.png" alt="CLOSE" />
          </button>
          <form className="wrap-search-header flex-w p-l-15">
            <button className="flex-c-m trans-04">
              <i className="zmdi zmdi-search" />
            </button>
            <input
              className="plh3"
              type="text"
              name="search"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
