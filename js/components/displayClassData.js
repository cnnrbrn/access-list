import classData from "../data/classData.js";
import { getWeekWithDataIfCurrentIsEmpty } from "../helpers/helpers.js";
import { findCurrentModule } from "../helpers/classModules.js";
import { getSelectedClass } from "../helpers/elements.js";

export default function displayClassData() {
	const tableBody = document.querySelector("#classData tbody");

	tableBody.innerHTML = "";

	const selectedClass = getSelectedClass();

	const weekWithData = getWeekWithDataIfCurrentIsEmpty();

	const classDataEntries = Object.entries(classData);

	for (let i = 0; i < classDataEntries.length; i++) {
		const className = classDataEntries[i][0];

		if (selectedClass && className !== selectedClass) {
			continue;
		}

		const newRow = tableBody.insertRow();

		let newCell = newRow.insertCell();

		let newText = document.createTextNode(className);
		newCell.classList.add("has-text-weight-bold");
		newCell.appendChild(newText);

		newCell = newRow.insertCell();

		const currentModule = findCurrentModule(className, weekWithData);

		newCell.innerHTML = currentModule;
	}
}
