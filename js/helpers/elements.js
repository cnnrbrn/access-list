import { formateDate } from "./helpers.js";

export function getSelectedDate() {
	const datepicker = document.querySelector("#date");
	if (!datepicker.value) {
		return null;
	}
	return formateDate(datepicker.value);
}

export function getSelectedClass() {
	const select = document.querySelector("#selectClass");
	return select.value;
}
