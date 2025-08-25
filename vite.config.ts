import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import favicons from "@peterek/vite-plugin-favicons";

// https://vite.dev/config/
export default defineConfig((env) => ({
    base: env.mode === "production" ? "/spectraura/" : "/",
    publicDir: "./public",
    plugins: [
        tsconfigPaths(),
        react(),
        favicons("src/assets/logo.webp", {
            path: env.mode === "production" ? "/spectraura/" : "/",
            appName: "SpectrAura - Music Visualized",
            appDescription:
                "SpectrAura is an interactive music visualization platform built with Web Audio and Canvas. Upload or play any track and watch as the audio spectrum comes alive with flowing shapes, neon gradients, and pulsating animations.",
            background: "#1d102c",
            theme_color: "#FFFFFF",
            developerName: "Lyeed",
            developerURL: "https://github.com/Lyeed",
            manifestMaskable: true,
        }),
    ],
    server: {
        port: 8080,
    },
    optimizeDeps: {
        include: [
            "react-is",
            "prop-types",
            "@fortawesome/free-solid-svg-icons/*",
        ], // Non-esm dependencies
    },
}));
