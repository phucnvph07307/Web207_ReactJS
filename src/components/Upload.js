import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { storage } from "../firebase";
const Upload = (props) => {
  const { control, register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data.image[0]);
    let file = data.image[0];
    // tạo reference chứa ảnh trên firesbase
    let storageRef = storage.ref(`images/${file.name}`);
    // đẩy ảnh lên đường dẫn trên
    storageRef.put(file).then(function () {
      storageRef.getDownloadURL().then((url) => {
        console.log(url);
      });
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          name="image"
          ref={register({
            required: true,
            validate: (value) => {
              let patternImage = /\S{1,}[^\.][\.][p|j][n|p][g|e]g?$/g;
              let checkImage = patternImage.test(value[0].name);
              return checkImage;
            },
          })}
        />
        <span className="text-danger">
          {errors.image?.type === "required" && "* Vui lòng nhập "}
          {errors.image?.type === "validate" && "* khong phải anh"}
        </span>
        <button className="btn btn-danger" type="submit">
          gui
        </button>
      </form>
    </div>
  );
};

Upload.propTypes = {};

export default Upload;
