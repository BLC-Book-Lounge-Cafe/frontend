/** Единый источник контактов и режима работы заведения. */

export const venueAddress = "г. Москва, ул. Примерная, д. 1, стр. 2"

export const venuePhone = {
  display: "+7 (999) 123-45-67",
  telHref: "tel:+79991234567",
} as const

export const venueEmail = {
  display: "info@cafe-library.ru",
  mailtoHref: "mailto:info@cafe-library.ru",
} as const

export const workingHoursRows = [
  {
    daysShort: "Пн–Пт",
    daysLong: "Понедельник – Пятница",
    time: "8:00 – 22:00",
  },
  {
    daysShort: "Сб–Вс",
    daysLong: "Суббота – Воскресенье",
    time: "10:00 – 23:00",
  },
] as const

export type WorkingHoursRow = (typeof workingHoursRows)[number]
