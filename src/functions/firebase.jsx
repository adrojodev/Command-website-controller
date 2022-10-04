import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, set } from "firebase/database";
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from "firebase/storage";

let interaction;
let keyNumbers = [];
let interactions = [];

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyCbDLF09yn8kxHXfnULe7fraIwXMdMEx4M",
  authDomain: "humankind-637da.firebaseapp.com",
  databaseURL: "https://humankind-637da-default-rtdb.firebaseio.com",
  projectId: "humankind-637da",
  storageBucket: "humankind-637da.appspot.com",
  messagingSenderId: "707375406570",
  appId: "1:707375406570:web:7ddbf35bca0f36d1f62693",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase();
const storage = getStorage();

export async function saveNewCommandOnDatabase(
  name,
  description,
  commands,
  responses
) {
  const elementPath = ref(database, `/interactions/`);

  push(elementPath, {
    name: name,
    description: description,
    commands: commands,
    responses: responses,
  }).then(() => {
    window.location.reload();
  });
}

export function getInteractionsFromDatabase() {
  return new Promise(function (resolve, reject) {
    try {
      onValue(ref(database, `interactions`), (snapshot) => {
        interaction = snapshot.val();
        interaction = Object.values(interaction);
        snapshot.forEach((child) => {
          keyNumbers.push(child.key);
        });
        interactions = [interaction, keyNumbers];

        resolve(interactions);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function getSpecificInteractionFromDatabase(elementId) {
  return new Promise(function (resolve, reject) {
    try {
      onValue(ref(database, `interactions/${elementId}`), (snapshot) => {
        interaction = snapshot.val();
        interaction = Object.values(interaction);

        resolve(interaction);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function changeInteractionOfDatabase(
  elementID,
  name,
  description,
  commands,
  responses
) {
  set(ref(database, `interactions/${elementID}`), {
    commands: commands,
    responses: responses,
    name: name,
    description: description,
  }).then(() => {
    window.location.reload();
  });
}

export function uploadImages(inputComponent) {
  const image = inputComponent.files[0];
  const path = sRef(storage, `images/${uuidv4()}`);

  uploadBytes(path, image).then((snapshot) => {
    getDownloadURL(path).then((url) => {
      inputComponent.parentNode.parentNode.getElementsByTagName(
        "input"
      )[0].value += String(url);
    });
  });
}
