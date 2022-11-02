import populateSelect from "./components/populateSelect.js";
import displayClassData from "./components/displayClassData.js";
import datepicker from "./components/datepicker.js";
import * as theme from "./theme/theme.js";

theme.setUp();
theme.handleThemePicker();
populateSelect();
displayClassData();
datepicker();
