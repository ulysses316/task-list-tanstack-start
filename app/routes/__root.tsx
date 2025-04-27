import {
	type Theme,
	ThemeProvider,
	useTheme,
} from "@/components/ThemeProvider";
import appCss from "@/master.css?url";
import { getThemeServerFn } from "@/utils/lib/ThemeProvider";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootComponent,
	notFoundComponent: () => <div>Not Found</div>,
	errorComponent: () => <div>Error</div>,
	loader: () => getThemeServerFn(),
});

function RootComponent() {
	const data = Route.useLoaderData();
	return (
		<ThemeProvider theme={data}>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</ThemeProvider>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	const { theme } = useTheme();
	return (
		<html lang="es" data-theme={theme} suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
