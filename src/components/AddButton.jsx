import React from "react";
import { useState } from "react";
import InputFieldAndButtonContainer from "./InputFieldAndButtonContainer";

const AddButton = ({ innerText, iconUsed }) => {
  function addElement(e) {
    function getLastWord(string) {
      var splittedString = string.split(" ");
      return splittedString[splittedString.length - 1];
    }

    function capitalizeFirstLetter(string) {
      const capitalized = string.charAt(0).toUpperCase() + string.slice(1);
      return capitalized;
    }

    let elementType = getLastWord(innerText);

    //Input field container
    const inputFieldContainer = document.createElement("div");
    inputFieldContainer.classList.add("inputFieldContainer");

    //Text Field
    const textField = document.createElement("input");
    textField.classList.add(elementType + "Input");
    textField.classList.add("inputComponent");
    textField.classList.add("extraInputComponent");
    textField.setAttribute("type", "text");
    textField.setAttribute("placeholder", capitalizeFirstLetter(elementType));

    //Add image button
    const addImageButton = document.createElement("button");
    const addImageIcon = document.createElement("span");
    addImageButton.classList.add("iconButton");
    addImageIcon.classList.add("material-icons");
    addImageButton.setAttribute("onclick", "clickInput(this)");
    addImageIcon.append("add_photo_alternate");
    addImageButton.append(addImageIcon);

    //Add input element
    const addImageInput = document.createElement("input");
    addImageInput.hidden = true;
    addImageInput.setAttribute("type", "file");
    addImageInput.setAttribute(
      "accept",
      "images/*, .jpg, .jpeg, .png, .gif, .apng"
    );
    addImageInput.setAttribute("onchange", "uploadImages(this)");

    //Delete option button
    const deleteFieldButton = document.createElement("button");
    const deleteFieldIcon = document.createElement("span");
    deleteFieldButton.classList.add("iconSimpleButton");
    deleteFieldButton.classList.add("deleteFieldButton");
    deleteFieldButton.setAttribute("onclick", "removeInput(this)");
    deleteFieldIcon.classList.add("material-icons");
    deleteFieldIcon.append("close");
    deleteFieldButton.append(deleteFieldIcon);

    if (elementType == "command") {
      addImageButton.setAttribute("style", "display:none;");
    } else if (elementType == "response") {
      addImageButton.setAttribute("style", "display: flex;");
    }

    inputFieldContainer.append(addImageInput);
    inputFieldContainer.append(textField);
    inputFieldContainer.append(addImageButton);
    inputFieldContainer.append(deleteFieldButton);

    e.target.parentNode.insertBefore(inputFieldContainer, e.target);
  }

  const [components, setComponents] = useState([]);

  function addComponent(e) {
    if (e.target.innerText == "add\nAdd command") {
      setComponents([...components, "Command"]);
    } else {
      setComponents([...components, "Response"]);
    }
  }

  return (
    <div className="inputContainer">
      {components.map((item, i) => (
        <div className="inputFieldContainer">
          <InputFieldAndButtonContainer
            typeOfInput={item}
            isVisible="yes"
          ></InputFieldAndButtonContainer>
        </div>
      ))}
      <button className="text-button" onClick={addComponent}>
        <span className="material-icons">{iconUsed}</span>
        {innerText}
      </button>
    </div>
  );
};

export default AddButton;
