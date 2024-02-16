import vituum from "vituum";
import pug from "@vituum/vite-plugin-pug";
import pkg from "./package.json";
import { Alias, defineConfig } from "vite";
import AssetsUploader from "./src/core/plugin/AssetsUploader";
import { compression } from "vite-plugin-compression2";
import { ZlibOptions } from "zlib";

const isDev = process.env.NODE_ENV !== "production";
const noCDN = Boolean(process.env.VITE_NOCDN);

const str = ["DEV Mode", "Force local deps"];
[isDev, noCDN].map((i, _b) => console.info(`${i ? "T" : "F"}  ${str[_b]}`));

function aliased(r: Record<string, string>): Alias[] {
  return Object.keys(r).map((k) => ({
    find: k,
    replacement: r[k],
  }));
}

function esmsh(): Alias[] {
  return pkg.cdnDependencies.map((k) => ({
    find: new RegExp(`^(${k}[/]?.*)$`),
    replacement: "https://esm.sh/$1?bundle",
  }));
}

export default defineConfig({
  plugins: [
    vituum({
      imports: {
        paths: [],
        filenamePattern: {},
      },
    }),
    pug({
      root: "./src",
    }),
    compression({
      skipIfLargerOrEqual: false,
      exclude: [/\.(br)$/, /\.(gz)$/, /\.(html)$/],
      compressionOptions: {
        gzip: {
          level: 9,
          strategy: 3
        } as ZlibOptions,
      },
    }),
    AssetsUploader(),
  ],
  build: {
    // sourcemap: "inline",
    // outDir: "./dist/client",
    cssMinify: "lightningcss",
    rollupOptions: {
      // external: ["node_modules/react-dom/server"],
    },
  },
  resolve: {
    alias: [
      ...(noCDN || isDev ? [] : esmsh()),
      ...aliased({
        "@": "/src",
        _: "/src/core",
      }),
    ],
  },
});
