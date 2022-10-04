import React, { useState } from "react";

const EditInteractionsButton = () => {
  function openEditOptions(e) {
    e.target.parentNode.parentNode.parentNode.getElementsByTagName(
      "div"
    )[1].style.display = "flex";
    e.target.style.display = "none";
  }
  return (
    <button
      className="iconButton iconFilledButton material-icons"
      onClick={openEditOptions}
    >
      edit
    </button>
  );
};

export default EditInteractionsButton;
