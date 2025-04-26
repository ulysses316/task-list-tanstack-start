import { getRouterManifest } from "@tanstack/react-start/router-manifest";
// app/ssr.tsx
import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";

import { createRouter } from "./router";

export default createStartHandler({
	createRouter,
	getRouterManifest,
})(defaultStreamHandler);
