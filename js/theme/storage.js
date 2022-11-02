const THEME = "theme";

export function setTheme(theme) {
	localStorage.setItem(THEME, theme);
}

export function getTheme() {
	return localStorage.getItem(THEME);
}
