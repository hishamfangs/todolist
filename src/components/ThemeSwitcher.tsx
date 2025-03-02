import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react"

export default function ThemeSwitcher() {
	const [theme, setTheme] = useLocalStorage("theme","light");

	function toggleTheme() {
		setTheme(theme == "light" ? "dark" : "light");	
	}

	return (
		<div className={"theme-switcher " + theme} onClick={toggleTheme}>
			<button></button>
			<button>Dark</button>
			<button>Light</button>
		</div>
	)
}