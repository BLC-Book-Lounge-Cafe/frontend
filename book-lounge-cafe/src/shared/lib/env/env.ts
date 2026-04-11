export const env = {
  baseURL: import.meta.env.VITE_API_URL_BASE,
  yandexMapWidgetSrc: import.meta.env.VITE_YANDEX_MAP_WIDGET_SRC,
  yandexMapLon: import.meta.env.VITE_YANDEX_MAP_LON,
  yandexMapLat: import.meta.env.VITE_YANDEX_MAP_LAT,
  yandexMapZoom: import.meta.env.VITE_YANDEX_MAP_ZOOM,
} as const
