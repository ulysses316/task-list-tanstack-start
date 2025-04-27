import { useTheme } from "@/components/ThemeProvider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const { setTheme, theme } = useTheme();
	return (
		<>
			<h1 className="text-4xl mt-20 text-red-500 dark:text-green-400">
				Hello World
			</h1>
			<p className="text-2xl mt-10 text-red-500 dark:text-green-400">
				Theme: {theme}
			</p>
			<button
				type="button"
				className="btn btn-primary mt-10 text-black dark:text-white"
				onClick={() => {
					setTheme(theme === "dark" ? "light" : "dark");
				}}
			>
				Toggle Theme
			</button>
		</>
	);
}
