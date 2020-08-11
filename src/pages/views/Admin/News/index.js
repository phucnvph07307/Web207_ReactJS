import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import News_API from "../../../../api/newsApi";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Moment from "react-moment";
const News = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllNews();
  }, []);
  const [news, setNews] = useState([]);
  const getAllNews = async () => {
    try {
      const response = await News_API.getAll();
      if (response.statusText === "OK" && response.status < 300) {
        setNews(response.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">List News</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {news.map(
                  (
                    { id, title, image, description, detail, created_at },
                    index
                  ) => (
                    <tr key={index}>
                      <th scope="row">{++index}</th>
                      <td>{title}</td>
                      <td>
                        <img src={image} width="100px" />
                      </td>
                      <td>{description}</td>

                      <td>
                        {<Moment format="DD/MM/YYYY">{created_at}</Moment>}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

News.propTypes = {};

export default News;
