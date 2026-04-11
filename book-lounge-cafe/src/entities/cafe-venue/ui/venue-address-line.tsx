import { venueAddress } from "../model/venue-info"

/** Адрес одной строкой с иконкой (карточка «Наш адрес» и т.п.). */
export function VenueAddressLine() {
  return (
    <p className="flex items-start gap-2">
      <span className="text-2xl" aria-hidden>
        📍
      </span>
      <span>{venueAddress}</span>
    </p>
  )
}
