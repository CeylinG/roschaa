// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: true,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    build: {
      rollupOptions: {
        // TanStack paketleri (react-router, react-query vb.) top-level "use client"
        // direktifleri içeriyor. Rollup bunları "Module level directives cause errors
        // when bundled" uyarısıyla raporluyor ve bazı CI ortamlarında (Netlify) build
        // fail olarak işaretleniyor. Bu uyarıları yutuyoruz; davranışa etkisi yok.
        onwarn(warning, defaultHandler) {
          if (
            warning.code === "MODULE_LEVEL_DIRECTIVE" &&
            typeof warning.message === "string" &&
            warning.message.includes("use client")
          ) {
            return;
          }
          defaultHandler(warning);
        },
      },
    },
  },
});
