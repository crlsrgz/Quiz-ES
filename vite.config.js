import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "./src",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                quiz: resolve(__dirname, "src/quiz/index.html"),
                score: resolve(__dirname, "src/score/index.html"),
                styling: resolve(__dirname, "src/styling/index.html"),
            },
        },
    },
});
