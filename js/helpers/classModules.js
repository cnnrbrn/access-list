import classData from "../data/classData.js";

function weekIsEmpty(moduleName) {
	return moduleName.trim() === "";
}

export function isNameOfModule(moduleName) {
	return isNaN(parseInt(moduleName)) && !weekIsEmpty(moduleName);
}

function weekOrModule(moduleName) {
	const name = moduleName.toLowerCase();
	if (name.includes("exam") || name.includes("project") || name.includes("portfolio")) {
		return "week";
	}
	return "module";
}

function findModuleName(classModules, index, className) {
	let emptyWeeks = 0;

	for (let i = index; i >= 0; i--) {
		const [moduleWeek] = Object.keys(classModules[i]);
		const moduleName = classModules[i][moduleWeek];

		if (weekIsEmpty(moduleName)) {
			emptyWeeks++;
		}

		if (isNameOfModule(moduleName)) {
			const moduleType = weekOrModule(moduleName);
			const currentWeek = getCurrentWeek(index, i - 1, emptyWeeks, className, moduleType);
			return `${moduleName}: ${moduleType} ${currentWeek}`;
		}
	}
}

function getCurrentWeek(index, count, emptyWeeks, className, moduleType) {
	let currentWeek = index - count - emptyWeeks;

	if (className.toLowerCase().includes(" p") && moduleType !== "week") {
		currentWeek = Math.ceil(currentWeek / 2);
	}

	return currentWeek;
}

export function findCurrentModule(className, week) {
	const classModules = classData[className];
	let thisWeek = classModules.find((classModule) => classModule.hasOwnProperty(week));

	const thisWeeksModule = thisWeek[week];

	if (isNameOfModule(thisWeeksModule)) {
		const moduleType = weekOrModule(thisWeeksModule);
		return `${thisWeeksModule} ${moduleType} 1`;
	}

	const thisWeekIndex = classModules.findIndex((classModule) => classModule.hasOwnProperty(week));

	const moduleName = findModuleName(classModules, thisWeekIndex, className);

	return moduleName ?? "No data";
}
