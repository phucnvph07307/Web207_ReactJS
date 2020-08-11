import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const Contact = (props) => {
  const { control, register, errors, handleSubmit } = useForm();
  let history = useHistory();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await axios.post("http://127.0.0.1:8000/api/contact", data);
    console.log(res);
    if (res.status < 300) {
      history.push("/");
      Swal.fire({
        position: "bottom-center",
        icon: "success",
        title: "Đã gửi liên hệ",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <section
        className="bg-img1 txt-center p-lr-15 p-tb-92"
        style={{ backgroundImage: 'url("../../dist/images/bg-01.jpg")' }}
      >
        <h2 className="ltext-105 cl0 txt-center">Contact</h2>
      </section>
      {/* Content page */}
      <section className="bg0 p-t-104 p-b-116">
        <div className="container">
          <div className="flex-w flex-tr">
            <div className="size-210 bor10 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Send Us A Message
                </h4>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-111 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    ref={register({
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />

                  <img
                    className="how-pos4 pointer-none"
                    src="../../dist/images/icons/icon-email.png"
                    alt="ICON"
                  />
                </div>

                <span className="text-danger">
                  {errors.email && errors.email.message}
                  {errors.email?.type === "required" && "Vui lòng nhập Email"}
                </span>
                <div className="bor8 m-b-30">
                  <textarea
                    className="stext-111 cl2 plh3 size-120 p-lr-28 p-tb-25"
                    name="message"
                    placeholder="How Can We Help?"
                    defaultValue={""}
                    ref={register()}
                  />
                </div>
                <button
                  type="submit"
                  className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="size-210 bor10 flex-w flex-col-m p-lr-93 p-tb-30 p-lr-15-lg w-full-md">
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-map-marker" />
                </span>
                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Address</span>
                  <p className="stext-115 cl6 size-213 p-t-18">
                    Coza Store Center 8th floor, 379 Hudson St, New York, NY
                    10018 US
                  </p>
                </div>
              </div>
              <div className="flex-w w-full p-b-42">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-phone-handset" />
                </span>
                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Lets Talk</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    +1 800 1236879
                  </p>
                </div>
              </div>
              <div className="flex-w w-full">
                <span className="fs-18 cl5 txt-center size-211">
                  <span className="lnr lnr-envelope" />
                </span>
                <div className="size-212 p-t-2">
                  <span className="mtext-110 cl2">Sale Support</span>
                  <p className="stext-115 cl1 size-213 p-t-18">
                    contact@example.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Map */}
      <div className="map">
        <iframe
          className="size-303"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d21065.930298155676!2d105.75192166560214!3d21.03406780874123!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454ec1885fed5%3A0x94b2a41570848f62!2zMTUwLTE1MiBU4buVIDMgxJDGsOG7nW5nIDMy!5e0!3m2!1svi!2s!4v1596049731011!5m2!1svi!2s"
          width={5000}
          height={1000}
          frameBorder={0}
          style={{ border: 0 }}
          allowFullScreen
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
    </div>
  );
};

Contact.propTypes = {};

export default Contact;
