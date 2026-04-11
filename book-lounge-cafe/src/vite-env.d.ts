/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// https://vite.dev/guide/env-and-mode.html#intellisense-for-typescript
interface ImportMetaEnv {
  readonly VITE_API_URL_BASE: string
  readonly VITE_YANDEX_MAP_WIDGET_SRC: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
