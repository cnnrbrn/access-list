import displayClassData from "./displayClassData.js";

export default function datepicker() {
	const datepicker = document.querySelector("#date");
	const clearButton = document.querySelector("#clear");

	datepicker.onchange = function (event) {
		if (event.target.value) {
			clearButton.classList.remove("is-hidden");
		} else {
			clearButton.classList.add("is-hidden");
		}
		displayClassData();
	};

	clearButton.onclick = function () {
		datepicker.value = "";
		displayClassData();
		this.classList.add("is-hidden");
	};
}
