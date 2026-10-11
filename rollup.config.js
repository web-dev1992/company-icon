import { babel } from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";

export default {
  input: "src/index.js",

  output: {
    file: "dist/index.esm.js",
    format: "esm",
  },

  external: ["react", /@babel\/runtime/],

  plugins: [
    babel({
      babelHelpers: "runtime",
      extensions: [".js", ".jsx"],
      exclude: "node_modules/**",
    }),
    filesize(),
  ],
};
