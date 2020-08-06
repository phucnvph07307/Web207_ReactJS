import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const ShowProduct = ({ products }) => {
  const { id } = useParams();

  return (
    <div>
      {products.map((elment, index) => {
        if (elment.id == id) {
          return (
            <div
              key={index.toString()}
              className="card"
              style={{ width: "18rem" }}>
              <img src={elment.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{elment.name}</h5>
                <p className="card-text">$ {elment.price}</p>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

ShowProduct.propTypes = {};

export default ShowProduct;
