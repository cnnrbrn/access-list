import classData from "../data/classData.js";
import { getWeekWithDataIfCurrentIsEmpty } from "../helpers/helpers.js";
import { findCurrentModule, findNextModule } from "../helpers/classModules.js";
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

		const [classModules, thisWeekIndex] = getClassModulesAndWeekIndex(className, weekWithData);

		const newRow = tableBody.insertRow();

		let newCell = newRow.insertCell();

		let newText = document.createTextNode(className);
		newCell.classList.add("has-text-weight-bold");
		newCell.appendChild(newText);

		const currentModule = findCurrentModule(classModules, thisWeekIndex, className);
		newCell = newRow.insertCell();
		newCell.innerHTML = currentModule;

		// const deadline = findDeadline(className, weekWithData);
		// newCell = newRow.insertCell();
		// newCell.innerHTML = JSON.stringify(deadline);

		const [nextModuleName, nextModuleDate] = findNextModule(classModules, thisWeekIndex);
		newCell = newRow.insertCell();
		newCell.innerHTML = nextModuleName ?? "";

		newCell = newRow.insertCell();
		newCell.innerHTML = nextModuleDate;
	}
}

function getClassModulesAndWeekIndex(className, week) {
	const classModules = classData[className];
	const thisWeekIndex = classModules.findIndex((classModule) => Object.prototype.hasOwnProperty.call(classModule, week));
	return [classModules, thisWeekIndex];
}
