import type { GetSpaceStateResponse } from "api/api-client/api"
import { parseNoiseLevel } from "./noise-level"

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

function pickObject(obj: Record<string, unknown>, keys: string[]): Record<string, unknown> | undefined {
  for (const key of keys) {
    const value = obj[key]
    if (value && typeof value === "object") return value as Record<string, unknown>
  }
  return undefined
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = obj[key]
    if (typeof value === "string" && value.trim()) return value.trim()
  }
  return undefined
}

export type ParsedAtmospherePatch = {
  crowdLevel?: number
  /** NoiseLevelType: 0–5. */
  noiseLevel?: number
  trackTitle?: string
  trackAuthors?: string
  trackImage?: string
  description?: string
}

export function parseAtmosphereFromResponse(
  data: GetSpaceStateResponse | unknown,
): ParsedAtmospherePatch | null {
  const root = (data && typeof data === "object" ? data : {}) as Record<string, unknown>
  const raw = pickObject(root, ["spaceState", "SpaceState"])
  if (!raw) return null

  const patch: ParsedAtmospherePatch = {}

  const wl = readPercent(raw.workloadLevel ?? raw.WorkloadLevel)
  const nl = parseNoiseLevel(raw.noiseLevel ?? raw.NoiseLevel)
  if (wl !== undefined) patch.crowdLevel = wl
  if (nl !== undefined) patch.noiseLevel = nl

  const description = pickString(raw, ["description", "Description"])
  if (description) patch.description = description

  const track = pickObject(raw, ["currentTrack", "CurrentTrack"])
  if (track) {
    const trackTitle = pickString(track, ["name", "Name"])
    if (trackTitle) patch.trackTitle = trackTitle

    const authorsRaw = track.authors ?? track.Authors
    if (Array.isArray(authorsRaw) && authorsRaw.length) {
      patch.trackAuthors = authorsRaw
        .filter((a): a is string => typeof a === "string" && a.trim() !== "")
        .join(", ")
    }

    const trackImage = pickString(track, ["imageUrl", "ImageUrl"])
    if (trackImage) patch.trackImage = trackImage
  }

  return patch
}
