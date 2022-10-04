import React from "react";
import {
  saveNewCommandOnDatabase,
  changeInteractionOfDatabase,
} from "../functions/firebase";

const Button = ({ innerText, iconUsed, buttonType }) => {
  function addInteraction(e) {
    if (e.target.innerText == "add\nNew interaction") {
      document.getElementById("inputCard").style.display = "flex";
      e.target.style.display = "none";
    } else {
      let buttonText = e.target.innerText;
      let allInputs =
        e.target.parentNode.parentNode.parentNode.getElementsByClassName(
          "inputComponent"
        );
      let emptyCheck = true;
      Array.from(allInputs).forEach((input) => {
        if (input.value == "" || input.value == " ") {
          emptyCheck = false;
          input.classList.add("emptyInput");
        }
      });
      if (emptyCheck) {
        if (buttonText == "Add interaction") {
          let interactionName = document.getElementById("nameInput").value;
          let interactionDescription =
            document.getElementById("descriptionInput").value;
          let commandText =
            e.target.parentNode.parentNode.parentNode.getElementsByClassName(
              "commandInput"
            );
          let responseText =
            e.target.parentNode.parentNode.parentNode.getElementsByClassName(
              "responseInput"
            );
          let allCommands = [];
          let allResponses = [];

          for (let command of commandText) {
            allCommands.push(command.value.toLowerCase());
          }

          for (let response of responseText) {
            allResponses.push(response.value);
          }

          saveNewCommandOnDatabase(
            interactionName,
            interactionDescription,
            allCommands,
            allResponses
          );
        } else if (buttonText == "Save changes") {
          let interactionName =
            e.target.parentNode.parentNode.parentNode.parentNode
              .getElementsByTagName("div")[0]
              .getElementsByTagName("h1")[0].innerText;

          let interactionDescription =
            e.target.parentNode.parentNode.parentNode.parentNode.getElementsByTagName(
              "p"
            )[0].innerText;
          let commands = [];
          let responses = [];
          let interactionID =
            e.target.parentNode.parentNode.parentNode.parentNode.id;

          Array.from(
            e.target.parentNode.parentNode.parentNode.getElementsByClassName(
              "commandInput"
            )
          ).forEach((command) => {
            commands.push(command.value);
          });

          Array.from(
            e.target.parentNode.parentNode.parentNode.getElementsByClassName(
              "responseInput"
            )
          ).forEach((response) => {
            responses.push(response.value);
          });

          changeInteractionOfDatabase(
            interactionID,
            interactionName,
            interactionDescription,
            commands,
            responses
          );
        }
      } else {
        alert("Fill all fields, pls");
      }
    }
  }

  return (
    <button
      className={"button " + buttonType + "Button"}
      onClick={addInteraction}
    >
      <span className="material-icons">{iconUsed}</span>
      {innerText}
    </button>
  );
};

export default Button;
