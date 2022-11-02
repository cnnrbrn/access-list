import studentClasses from "../data/studentClasses.js";
import displayClassData from "./displayClassData.js";

export default function populateSelect() {
  const select = document.querySelector("#selectClass");

  if (!select) {
    return console.log("No select with #selectClass found");
  }

  studentClasses.forEach((studentClass) => {
    select.options[select.options.length] = new Option(
      studentClass,
      studentClass
    );
  });

  select.onchange = function () {
    displayClassData();
  };
}
