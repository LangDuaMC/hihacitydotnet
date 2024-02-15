import path from "node:path/posix";
import type { OutputOptions, OutputAsset, OutputChunk } from "rollup";

export default function AssetsUploader(longDir = "", uploadDir = "assets") {
  return {
    name: "asset-path-prefix",
    generateBundle(
      _: OutputOptions,
      bundle: { [fileName: string]: OutputAsset | OutputChunk }
    ) {
      for (const fileName in bundle) {
        const file = bundle[fileName];
        if (fileName.startsWith("assets/")) {
          file.fileName = path.join(
            uploadDir,
            longDir,
            path.basename(file.fileName)
          );
        }
      }
    },
  };
}
