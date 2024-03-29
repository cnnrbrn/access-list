import allWeeks from "../data/weeks.js";
import { getSelectedDate } from "./elements.js";
import displayWeek from "../components/displayWeek.js";

export function getMondayOfWeek(date) {
	if (date) {
		date = new Date(date);
	} else {
		date = new Date();
	}
	const firstMondayOfWeek = date.setDate(date.getDate() - ((date.getDay() + 6) % 7));
	const firstMondayOfWeekAsDate = new Date(firstMondayOfWeek);
	console.log("firstMondayOfWeekAsDate", firstMondayOfWeekAsDate);

	const dateOfFirstDay = `${
		firstMondayOfWeekAsDate.getMonth() + 1
	}/${firstMondayOfWeekAsDate.getDate()}/${firstMondayOfWeekAsDate.getFullYear()}`;

	return dateOfFirstDay;
}

export function getSundayOfWeek(date) {
	if (date) {
		date = new Date(date);
	} else {
		date = new Date();
	}
	const nextSunday = date.setDate(date.getDate() + (date.getDay() + 5));
	const nextSundayAsDate = new Date(nextSunday);

	const dateOfNextSunday = `${nextSundayAsDate.getMonth() + 1}/${nextSundayAsDate.getDate()}/${nextSundayAsDate.getFullYear()}`;

	return dateOfNextSunday;
}

export function doesThisWeekExistInTheData(allWeeks, week) {
	return allWeeks.includes(week);
}

export function formatDate(date, monthFirst = true) {
	// Create a new Date object
	let d = new Date(date);

	// Adjust for timezone offset to ensure the correct date
	d = new Date(d.getTime() + d.getTimezoneOffset() * 60000);

	let datestring;

	if (monthFirst) {
		datestring = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
	} else {
		datestring = d.getDate() + " " + d.toLocaleString("default", { month: "long" }) + " " + d.getFullYear();
	}

	return datestring;
}

export function findClosestPrevDate(dates, currentWeek) {
	const currentWeekDate = new Date(currentWeek);

	const previousDates = dates.filter((e) => currentWeekDate - new Date(e) > 0);

	const sortedPreviousDates = previousDates.sort((a, b) => new Date(b) - new Date(a));

	return sortedPreviousDates[0] || null;
}

export function getWeekWithDataIfCurrentIsEmpty() {
	const selectedDate = getSelectedDate();
	console.log("selectedDate", selectedDate);

	let weekToGetDataFor = getMondayOfWeek(selectedDate);
	console.log("weekToGetDataFor", weekToGetDataFor);

	if (!doesThisWeekExistInTheData(allWeeks, weekToGetDataFor)) {
		const wantedWeek = weekToGetDataFor;
		weekToGetDataFor = findClosestPrevDate(allWeeks, weekToGetDataFor);
		displayWeek(weekToGetDataFor, false, wantedWeek);
	} else {
		displayWeek(weekToGetDataFor);
	}

	return weekToGetDataFor;
}
