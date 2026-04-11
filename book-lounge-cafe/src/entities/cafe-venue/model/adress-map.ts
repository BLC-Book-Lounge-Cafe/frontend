import { env } from "shared/lib/env/env"

export function yandexMapWidgetSrc() {
  const ll = `${env.yandexMapLon},${env.yandexMapLat}`
  const pt = `${env.yandexMapLon},${env.yandexMapLat},pm2rdm`
  const params = new URLSearchParams({
    ll,
    z: String(env.yandexMapZoom),
    l: "map",
    pt,
  })
  return `${env.yandexMapWidgetSrc}?${params.toString()}`
}