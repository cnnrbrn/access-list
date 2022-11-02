import { formateDate } from "../helpers/helpers.js";

export default function displayWeek(
  week,
  weekisCurrent = true,
  wantedWeek = null
) {
  const weekDisplay = document.querySelector("#week");

  if (weekisCurrent) {
    weekDisplay.innerHTML = `Week beginning: <b>${formateDate(
      week,
      false
    )}</b>`;
  } else {
    weekDisplay.innerHTML = `
            There is no data for the week beginning: <b>${formateDate(
              wantedWeek,
              false
            )}</b>
            <br /> Displaying data for the week beginning: <b>${formateDate(
              week,
              false
            )}</b>`;
  }
}
