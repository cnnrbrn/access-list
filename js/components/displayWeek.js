import { formatDate } from "../helpers/helpers.js";

export default function displayWeek(week, weekisCurrent = true, wantedWeek = null) {
	const weekDisplay = document.querySelector("#week");

	if (weekisCurrent) {
		weekDisplay.innerHTML = `Week beginning: <b>${formatDate(week, false)}</b>`;
	} else {
		weekDisplay.innerHTML = `
            There is no data for the week beginning: <b>${formatDate(wantedWeek, false)}</b>
            <br /> Displaying data for the week beginning: <b>${formatDate(week, false)}</b>`;
	}
}
