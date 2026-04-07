import { DateFormatter } from "@internationalized/date"

export const dateFormatter = new class {
  private locale = "ru-RU"
  private options: Intl.DateTimeFormatOptions = {}
  private formatter = new DateFormatter(this.locale, this.options)
  private milisecondsInOneMinute = 60000

  /**
   * Форматирует переданную дату в строку, используя заданную локаль и опции.
   * Если дата некорректна, возвращает строку "Некорректная дата".
   * @param date - Дата, которую нужно отформатировать.
   * @param options - Дополнительные опции для форматирования.
   * @returns Отформатированная строка даты.
   */
  public format = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
    date = typeof date === "string" ? new Date(date) : date
    if (!this.isValidDate(date)) return "Некорректная дата"
    let formatter: DateFormatter = this.formatter
    if (options) formatter = new DateFormatter(this.locale, options)
    return formatter.format(date)
  }

  /**
   * Форматирует ISO-строку в читаемое значение, используя заданные опции.
   * @param iso - ISO строка, представляющая дату.
   * @param options - Дополнительные опции для форматирования.
   * @returns Отформатированная строка даты.
   */
  public formatIso = (iso: string, options?: Intl.DateTimeFormatOptions): string => {
    return this.format(new Date(iso), options)
  }

  /**
   * Форматирует год из переданной даты или строки в соответствии с заданными опциями.
   * @param date - Дата или строка с датой для извлечения года.
   * @param options - Опции для форматирования года.
   * @returns Отформатированная строка года.
   */
  public formatYear = (date: Date | string, options: Pick<Intl.DateTimeFormatOptions, "year"> = { year: "numeric" }): string => {
    if (typeof date === "string") {
      return this.formatIso(date, options)
    } else {
      return this.format(date, options)
    }
  }

  /**
   * Форматирует месяц из переданной даты или строки в соответствии с заданными опциями.
   * @param date - Дата или строка с датой для извлечения месяца.
   * @param options - Опции для форматирования месяца.
   * @returns Отформатированная строка месяца.
   */
  public formatMonth = (date: Date | string, options: Pick<Intl.DateTimeFormatOptions, "month"> = { month: "long" }): string => {
    if (typeof date === "string") {
      return this.formatIso(date, options)
    } else {
      return this.format(date, options)
    }
  }

  /**
* Проверяет, является ли переданный объект корректной датой.
* @param isoDate - Строка ISO, которую нужно конверитировать в такую же строку, но с учетом часового пояса.
* @returns возвращает ISO строку, с текущим часовым поясом
*/
  public toIsoLocal = (isoDate: string): string => {
    const date = new Date(isoDate)
    const offset = date.getTimezoneOffset() * this.milisecondsInOneMinute
    const localIsoTime = new Date(date - offset).toISOString().slice(0, -1)
    return localIsoTime
  }

  /**
   * Проверяет, является ли переданный объект корректной датой.
   * @param date - Объект, который нужно проверить на корректность.
   * @returns true, если объект является корректной датой, иначе false.
   */
  private isValidDate = (date: Date): date is Date => {
    return (
      !!date
      && typeof date === "object"
      && Object.prototype.toString.call(date) === "[object Date]"
      && !isNaN(date.valueOf())
    )
  }
}()
