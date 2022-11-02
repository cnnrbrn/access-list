import { setTheme, getTheme } from "./storage.js";

export function setUp() {
  let theme = getTheme();

  if (!theme) {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  setThemeInDocument(theme);
}

function setThemeInDocument(theme) {
  const html = document.querySelector("html");

  switch (theme) {
    case "dark":
      html.classList = "dark";
      document.querySelector("#themePicker input.dark").checked = true;
      break;
    case "red":
      html.classList = "red";
      document.querySelector("#themePicker input.red").checked = true;
      break;
    default:
      document.querySelector("#themePicker input.light").checked = true;
      html.classList = "light";
  }
}

export function handleThemePicker() {
  const radios = document.querySelectorAll("#themePicker input");

  radios.forEach((radio) => {
    console.log(radio);
    radio.addEventListener("click", function () {
      setTheme(this.value);
      setThemeInDocument(this.value);
    });
  });
}
