import { defineConfig } from "tsup";
import fs from "fs/promises";
import path from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  sourcemap: true,
  dts: true,
  external: ["react", "react-native", "react-native-svg"],
  platform: "neutral",
  async onSuccess() {
    if (process.env.NODE_ENV === "development") {
      const exampleOutputPath = path.resolve(
        "./example/node_modules/react-native-copilot"
      );
      const exampleOutputNodeModulesPath = path.resolve(
        exampleOutputPath,
        "node_modules"
      );

      await Promise.all(
        ["dist/index.js", "dist/index.d.ts"].map(async (file) => {
          const outputPath = path.resolve(exampleOutputPath, file);
          console.log("Copying file: ", file, "to ->", outputPath);
          await fs.copyFile(file, outputPath);
        })
      );
      await fs.rm(exampleOutputNodeModulesPath, {
        recursive: true,
        force: true,
      });
      console.log("Copied files to example project");
    }
  },
});
