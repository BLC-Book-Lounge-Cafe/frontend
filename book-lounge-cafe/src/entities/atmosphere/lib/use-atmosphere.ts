import { useEffect, useState } from "react"
import { fetchSpaceState } from "../api/get-space-state"
import {
  ATMOSPHERE_FALLBACK_CROWD,
  ATMOSPHERE_FALLBACK_NOISE,
  ATMOSPHERE_FALLBACK_TRACK_AUTHORS,
  ATMOSPHERE_FALLBACK_TRACK_TITLE,
} from "../model/constants"
import { parseAtmosphereFromResponse } from "../model/space-state"
import { getNoiseLevelLabel, getWorkloadLevelLabel } from "../model/workload-noise-labels"

export function useAtmosphere() {
  const [crowdLevel, setCrowdLevel] = useState(ATMOSPHERE_FALLBACK_CROWD)
  const [noiseLevel, setNoiseLevel] = useState(ATMOSPHERE_FALLBACK_NOISE)
  const [trackTitle, setTrackTitle] = useState(ATMOSPHERE_FALLBACK_TRACK_TITLE)
  const [trackAuthors, setTrackAuthors] = useState(ATMOSPHERE_FALLBACK_TRACK_AUTHORS)
  const [trackImage, setTrackImage] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const data = await fetchSpaceState()
        if (cancelled) return

        const patch = parseAtmosphereFromResponse(data)
        if (!patch) {
          setLoading(false)
          return
        }

        if (patch.crowdLevel !== undefined) setCrowdLevel(patch.crowdLevel)
        if (patch.noiseLevel !== undefined) setNoiseLevel(patch.noiseLevel)
        if (patch.trackTitle !== undefined) setTrackTitle(patch.trackTitle)
        if (patch.trackAuthors !== undefined) setTrackAuthors(patch.trackAuthors)
        if (patch.trackImage !== undefined) setTrackImage(patch.trackImage)
        if (patch.description !== undefined) setDescription(patch.description)
      } catch {
        /* значения по умолчанию */
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return {
    crowdLevel,
    noiseLevel,
    crowdLabel: getWorkloadLevelLabel(crowdLevel),
    noiseLabel: getNoiseLevelLabel(noiseLevel),
    trackTitle,
    trackAuthors,
    trackImage,
    description,
    loading,
  }
}
