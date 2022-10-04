import React from "react";
import { uploadImages } from "../functions/firebase";

const AddImageButton = ({ visible }) => {
  function addImage(e) {
    e.target.parentNode.getElementsByTagName("input")[0].click();
  }

  function uploadImage(e) {
    uploadImages(e.target);
  }

  return (
    <div>
      <button
        className="iconButton material-icons"
        style={{ display: visible }}
        onClick={addImage}
      >
        add_photo_alternate
      </button>
      <input
        type="file"
        accept="images/*, .jpg, .jpeg, .png, .gif, .apng"
        onChange={uploadImage}
        hidden
      />
    </div>
  );
};

export default AddImageButton;
