import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Contact_API from "../../../../api/contactApi";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Moment from "react-moment";
const Contact = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllContacts();
  }, []);
  const [contact, setContact] = useState([]);
  const getAllContacts = async () => {
    try {
      const response = await Contact_API.getAll();
      if (response.statusText === "OK" && response.status < 300) {
        setContact(response.data);
      }
    } catch (error) {}
  };
  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">List Contact</h1>
      </div>
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {contact.map(({ id, email, message, created_at }, index) => (
                  <tr key={index}>
                    <th scope="row">{++index}</th>
                    <td>{email}</td>
                    <td>{message}</td>
                    <td>{<Moment format="DD/MM/YYYY">{created_at}</Moment>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Contact.propTypes = {};

export default Contact;
