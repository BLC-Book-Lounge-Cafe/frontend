import { TABLE_BOOKING_SECTION_ID } from "../model/constants"

export function scrollToTableBookingSection() {
  document.getElementById(TABLE_BOOKING_SECTION_ID)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}
