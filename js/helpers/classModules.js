import classData from "../data/classData.js";

/**
 * Checks if a week has no class that week.
 * @param {string} moduleName
 * @returns {boolean}
 */
export function weekIsEmpty(moduleName) {
  //
  return moduleName.trim() === "";
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
  if (
    name.includes("exam") ||
    name.includes("project") ||
    name.includes("portfolio")
  ) {
    return "week";
  }
  return "module";
}

/**
 *
 * @param {*} classModules
 * @param {*} index
 * @param {*} className
 * @returns
 */

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

      let currentWeek = getCurrentWeek(
        index,
        i - 1,
        emptyWeeks,
        className,
        moduleType
      );

      let remainingWeeks = findRemainingWeeks(
        classModules,
        index,
        classModules.length,
        moduleName
      );

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

function getCurrentWeek(index, count, emptyWeeks) {
  let currentWeek = index - count - emptyWeeks;

  return currentWeek;
}

function isClassPartTime(className) {
  return className.toLowerCase().includes(" p");
}

export function findCurrentModule(className, week) {
  const classModules = classData[className];
  // let thisWeek = classModules.find((classModule) => classModule.hasOwnProperty(week));

  // const thisWeeksModule = thisWeek[week];

  // if (isNameOfModule(thisWeeksModule)) {
  // 	const moduleType = weekOrModule(thisWeeksModule);

  // 	// let remainingWeeks = findRemainingWeeks(classModules, index, classModules.length, moduleName, moduleType, className);

  // 	return `<b>${thisWeeksModule}</b> ${moduleType} 1 of `;
  // }

  const thisWeekIndex = classModules.findIndex(
    (classModule) => Object.prototype.hasOwnProperty.call(classModule, week)

    // classModule.hasOwnProperty(week)
  );

  const moduleName = findModuleName(classModules, thisWeekIndex, className);

  return moduleName ?? "No data";
}
