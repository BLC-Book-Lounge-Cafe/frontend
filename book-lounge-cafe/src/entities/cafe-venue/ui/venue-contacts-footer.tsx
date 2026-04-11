import { venueAddress, venueEmail, venuePhone } from "../model/venue-info"

/** Контакты для футера (тёмный фон, ссылки с hover). */
export function VenueContactsFooter() {
  return (
    <div className="space-y-2 text-body-small">
      <p>📍 {venueAddress}</p>
      <p>
        📞{" "}
        <a href={venuePhone.telHref} className="hover:text-accent transition-colors">
          {venuePhone.display}
        </a>
      </p>
      <p>
        ✉️{" "}
        <a href={venueEmail.mailtoHref} className="hover:text-accent transition-colors">
          {venueEmail.display}
        </a>
      </p>
    </div>
  )
}
