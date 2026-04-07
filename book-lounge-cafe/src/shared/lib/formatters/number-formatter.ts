export const numberFormatter = new class NumberFormat {
  private locale = "ru-RU"
  private formatter = new Intl.NumberFormat(this.locale, { maximumFractionDigits: 2 })

  public format = (value: number, options?: Intl.NumberFormatOptions): string => {
    if (options) return new Intl.NumberFormat(this.locale, options).format(value)
    else return this.formatter.format(value)
  }
}()
