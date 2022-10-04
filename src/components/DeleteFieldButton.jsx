import React from "react";

const DeleteFieldButton = ({ isVisible }) => {
  let isVisibleOrNot;

  function deleteThisItem(e) {
    e.target.parentNode.parentNode.parentNode.remove();
  }

  if (isVisible == "yes") {
    isVisibleOrNot = "flex";
  } else {
    isVisibleOrNot = "none";
  }

  return (
    <button
      className="iconSimpleButton"
      style={{ display: isVisibleOrNot }}
      onClick={deleteThisItem}
    >
      <span className="material-icons">close</span>
    </button>
  );
};

export default DeleteFieldButton;
