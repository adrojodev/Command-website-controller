import React from "react";

const CancelButton = () => {
  function cancel(e) {
    e.target.parentNode.parentNode.parentNode.style.display = "none";

    e.target.parentNode.parentNode.parentNode.style.display = "none";
    if (e.target.parentNode.parentNode.parentNode.id == "inputCard") {
      e.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName(
        "normalButton"
      )[0].style.display = "flex";
    } else {
      e.target.parentNode.parentNode.parentNode.parentNode
        .getElementsByTagName("div")[0]
        .getElementsByTagName("astro-island")[0]
        .getElementsByTagName("button")[0].style.display = "flex";
    }
  }

  return (
    <button className="text-button" onClick={cancel}>
      Cancel
    </button>
  );
};

export default CancelButton;
