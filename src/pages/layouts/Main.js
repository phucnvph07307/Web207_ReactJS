import React from "react";
import Header from "../../components/Main/Header";
import Footer from "../../components/Main/Footer";

export default ({ children, cart }) => {
  console.log("render Main");

  return (
    <div>
      <Header cart={cart} />
      {children}
      <Footer />
    </div>
  );
};
