import classData from "../data/classData.js";
import { formateDate, getSundayOfWeek } from "./helpers.js";

/**
 * Checks if a week has no class that week.
 * @param {string} moduleName
 * @returns {boolean}
 */
export function weekIsEmpty(moduleName) {
	//
	return moduleName.trim() === "";
	//
	//
}

/**
 * Checks if the param is the name of a course.
 * @param {string} moduleName
 * @returns {boolean}
 */
export function isNameOfModule(moduleName) {
	return isNaN(parseInt(moduleName)) && !weekIsEmpty(moduleName);
}

/**
 * Checks if the param should be considered a week or a module
 * @param {string} moduleName
 * @returns {string} "week" | "module"
 */
function weekOrModule(moduleName) {
	const name = moduleName.toLowerCase();
	if (name.includes("exam") || name.includes("project") || name.includes("portfolio")) {
		return "week";
	}
	return "module";
}

/**
 *
 * @param {object[]} classModules
 * @param {number} index
 * @param {string} className
 * @returns {string}
 */

function createModuleNameWithNumberOfWeeks(classModules, index, className) {
	let emptyWeeks = 0;

	for (let i = index; i >= 0; i--) {
		const [moduleWeek] = Object.keys(classModules[i]);
		const moduleName = classModules[i][moduleWeek];

		if (weekIsEmpty(moduleName)) {
			emptyWeeks++;
		}

		if (isNameOfModule(moduleName)) {
			const moduleType = weekOrModule(moduleName);

			let currentWeek = getCurrentWeek(index, i - 1, emptyWeeks, className, moduleType);

			let remainingWeeks = findRemainingWeeks(classModules, index, classModules.length, moduleName);

			if (isClassPartTime(className) && moduleType !== "week") {
				if (currentWeek % 2 === 0) {
					remainingWeeks = Math.ceil(remainingWeeks / 2);
				} else {
					remainingWeeks = Math.floor(remainingWeeks / 2);
				}

				currentWeek = Math.ceil(currentWeek / 2);
			}

			let totalWeeks = currentWeek + remainingWeeks;

			return `<b>${moduleName}</b> ${moduleType} <b>${currentWeek}</b> of <b>${totalWeeks}</b>`;
		}
	}
}

function getNextModuleNameAndDate(classModules, index) {
	for (let i = index; i >= 0; i--) {
		const [moduleWeek] = Object.keys(classModules[i]);
		const moduleName = classModules[i][moduleWeek];

		if (isNameOfModule(moduleName)) {
			const nextModuleName = findNextModuleNameAndDate(classModules, index, classModules.length, moduleName);
			return nextModuleName;
		}
	}
}

function getCurrentDeadline(classModules, index) {
	for (let i = index; i >= 0; i--) {
		const [moduleWeek] = Object.keys(classModules[i]);
		const moduleName = classModules[i][moduleWeek];

		return findDeadlineForCurrentModule(classModules, index, classModules.length, moduleName);
	}
}
/**
 *
 * @param {object[]} classModules
 * @param {number} index
 * @param {number} loopLimit
 * @param {string} [currentModuleName]
 * @return {number}
 */
function findRemainingWeeks(classModules, index, loopLimit, currentModuleName) {
	let emptyWeeks = 0;
	let count = 0;

	for (let i = index + 1; i <= loopLimit; i++) {
		const [moduleWeek] = Object.keys(classModules[i]);
		const moduleName = classModules[i][moduleWeek];

		if (weekIsEmpty(moduleName)) {
			if (currentModuleName === "Portfolio2") {
				break;
			}
			emptyWeeks++;
		}

		if (isNameOfModule(moduleName)) {
			break;
		}

		count++;
	}

	return count - emptyWeeks;
}

function findNextModuleNameAndDate(classModules, index, loopLimit, currentModuleName) {
	for (let i = index + 1; i <= loopLimit; i++) {
		const [moduleWeek] = Object.keys(classModules[i]);

		const moduleName = classModules[i][moduleWeek];

		if (weekIsEmpty(moduleName) && currentModuleName === "Portfolio2") {
			return null;
		}

		if (isNameOfModule(moduleName)) {
			return [moduleName, formateDate(moduleWeek, false)];
		}
	}

	return null;
}

// eslint-disable-next-line no-unused-vars
function findDeadlineForCurrentModule(classModules, index, loopLimit, currentModuleName) {
	let deadlineWeek = "";

	for (let i = index + 1; i <= loopLimit; i++) {
		const [moduleWeek] = Object.keys(classModules[i]);
		const moduleName = classModules[i][moduleWeek];

		console.log("moduleWeek", moduleWeek);

		// if (weekIsEmpty(moduleName) && currentModuleName === "Portfolio2") {
		// 	return "No next module";
		// }
		if (i === index + 1) {
			deadlineWeek = moduleWeek;
		}

		if (isNameOfModule(moduleName)) {
			break;
		}

		if (!weekIsEmpty(moduleName)) {
			deadlineWeek = moduleWeek;
		}
	}

	return getSundayOfWeek(deadlineWeek);
}

function getCurrentWeek(index, count, emptyWeeks) {
	let currentWeek = index - count - emptyWeeks;
	return currentWeek;
}

function isClassPartTime(className) {
	return className.toLowerCase().includes(" p");
}

export function findCurrentModule(classModules, thisWeekIndex, className) {
	// const classModules = classData[className];
	// const thisWeekIndex = classModules.findIndex((classModule) => Object.prototype.hasOwnProperty.call(classModule, week));
	const moduleName = createModuleNameWithNumberOfWeeks(classModules, thisWeekIndex, className);
	return moduleName ?? "No data";
}

export function findNextModule(classModules, thisWeekIndex) {
	// const classModules = classData[className];
	// const thisWeekIndex = classModules.findIndex((classModule) => Object.prototype.hasOwnProperty.call(classModule, week));
	const moduleNameAndDate = getNextModuleNameAndDate(classModules, thisWeekIndex);
	console.log("moduleNameAndDate", moduleNameAndDate);
	return moduleNameAndDate ?? ["", ""];
}

export function findDeadline(className, week) {
	const classModules = classData[className];
	const thisWeekIndex = classModules.findIndex((classModule) => Object.prototype.hasOwnProperty.call(classModule, week));
	const deadline = getCurrentDeadline(classModules, thisWeekIndex);
	return deadline;
}
