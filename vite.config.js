import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "./src",
    base: "/",
    build: {
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                frase: resolve(__dirname, "src/frase/index.html"),
                marcador: resolve(__dirname, "src/marcador/index.html"),
                estilos: resolve(__dirname, "src/estilos/index.html"),
            },
        },
    },
});
