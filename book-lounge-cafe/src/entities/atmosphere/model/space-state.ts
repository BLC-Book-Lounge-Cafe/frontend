import type { GetSpaceStateResponse } from "api/api-client/api"

export type SpaceStatePayload = NonNullable<GetSpaceStateResponse["spaceState"]> & {
  noiseLevel?: number
  workloadLevel?: number
}

function clampPercent(n: number) {
  return Math.min(100, Math.max(0, n))
}

export function readPercent(value: unknown): number | undefined {
  if (typeof value === "number" && !Number.isNaN(value)) return clampPercent(value)
  return undefined
}

export type ParsedAtmospherePatch = {
  crowdLevel?: number
  noiseLevel?: number
  trackTitle?: string
  trackAuthors?: string
  trackImage?: string
  description?: string
}

export function parseAtmosphereFromResponse(
  data: GetSpaceStateResponse,
): ParsedAtmospherePatch | null {
  const raw = data.spaceState as SpaceStatePayload | undefined
  if (!raw) return null

  const patch: ParsedAtmospherePatch = {}

  const wl = readPercent(raw.workloadLevel)
  const nl = readPercent(raw.noiseLevel)
  if (wl !== undefined) patch.crowdLevel = wl
  if (nl !== undefined) patch.noiseLevel = nl

  if (raw.description?.trim()) patch.description = raw.description.trim()

  const track = raw.currentTrack
  if (track?.name?.trim()) patch.trackTitle = track.name.trim()
  if (track?.authors?.length) patch.trackAuthors = track.authors.join(", ")
  if (track?.imageUrl?.trim()) patch.trackImage = track.imageUrl.trim()

  return patch
}
