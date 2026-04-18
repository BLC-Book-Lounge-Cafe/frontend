import { useEffect, useMemo, useState } from "react"
import { Collection } from "react-aria-components"
import { Controller, useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { getLocalTimeZone, now, parseDate } from "@internationalized/date"
import { createTableReservation, fetchTableReservationSlots, type TableReservationSlot } from "entities/table-reservation"
import type { CafeTable } from "entities/table"
import { Button } from "shared/ui/button"
import { TextField } from "shared/ui/text-field"
import { DatePicker } from "shared/ui/date/date-picker"
import { Select } from "shared/ui/pickers/select"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import { formatSeatsCount } from "shared/lib/plural-ru"
import { parseBookingTableSubmitError } from "../lib/parse-submit-error"
import {
  bookingTableFormSchema,
  calendarDateStringFromField,
  reservationDayToIsoStart,
  type BookingTableFormValues,
} from "../model/validation"

const timeFormatter = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" })

const emptyBookingTableValues: BookingTableFormValues = {
  tableId: 0,
  reservationDate: "",
  slotStart: "",
  customerName: "",
  customerPhone: "",
}

function formatSlotLabel(startIso: string, endIso: string) {
  const s = new Date(startIso)
  const e = new Date(endIso)
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return startIso
  return `${timeFormatter.format(s)} — ${timeFormatter.format(e)}`
}

type BookingTableFormProps = {
  tables: CafeTable[]
  tablesLoading: boolean
  /** Зафиксированный стол (модалка после выбора карточки) — поле выбора стола скрыто. */
  lockedTable?: CafeTable | null
  onSuccess?: () => void
}

export function BookingTableForm(props: BookingTableFormProps) {
  const [slots, setSlots] = useState<TableReservationSlot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [slotsError, setSlotsError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const locked = props.lockedTable ?? null

  const form = useForm<BookingTableFormValues>({
    defaultValues: locked
      ? { ...emptyBookingTableValues, tableId: locked.id }
      : emptyBookingTableValues,
    resolver: zodResolver(bookingTableFormSchema),
  })

  const tableId = form.watch("tableId")
  const reservationDate = form.watch("reservationDate")

  const tableItems = useMemo(
    () =>
      props.tables.map((t) => ({
        id: String(t.id),
        label: `Стол №${t.id}, ${formatSeatsCount(t.seatsCount)}`,
      })),
    [props.tables],
  )

  const freeSlots = useMemo(() => slots.filter((s) => !s.isReserved), [slots])

  const slotItems = useMemo(
    () =>
      freeSlots.map((s) => ({
        id: s.startTime,
        label: formatSlotLabel(s.startTime, s.endTime),
      })),
    [freeSlots],
  )

  useEffect(() => {
    form.resetField("slotStart")
  }, [tableId, reservationDate, form])

  useEffect(() => {
    if (!tableId || tableId <= 0 || !reservationDate || !calendarDateStringFromField(reservationDate)) {
      setSlots([])
      setSlotsError(null)
      return
    }

    let cancelled = false
    setSlotsLoading(true)
    setSlotsError(null)

    ;(async () => {
      try {
        const iso = reservationDayToIsoStart(reservationDate)
        const next = await fetchTableReservationSlots(tableId, iso)
        if (cancelled) return
        setSlots(next)
      } catch (err) {
        if (!cancelled) {
          setSlots([])
          setSlotsError(
            err instanceof Error && err.message
              ? err.message
              : "Не удалось загрузить свободные интервалы.",
          )
        }
      } finally {
        if (!cancelled) setSlotsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [tableId, reservationDate])

  const onSubmit: SubmitHandler<BookingTableFormValues> = async (values) => {
    setSubmitError(null)
    const slot = freeSlots.find((s) => s.startTime === values.slotStart)
    if (!slot) {
      setSubmitError("Выберите доступный интервал времени.")
      return
    }

    try {
      await createTableReservation({
        tableId: values.tableId,
        customerName: values.customerName,
        customerPhone: values.customerPhone,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })
      toastManager.show({
        title: "Стол забронирован",
        message: "Ждём вас в назначенное время.",
        color: "success",
      })
      setSlots([])
      form.reset({
        ...emptyBookingTableValues,
        ...(locked ? { tableId: locked.id } : {}),
      })
      props.onSuccess?.()
    } catch (err) {
      setSubmitError(parseBookingTableSubmitError(err))
    }
  }

  const slotsHint =
    !slotsLoading && !slotsError && tableId > 0 && reservationDate
      ? freeSlots.length === 0
        ? slots.length > 0
          ? "На эту дату все интервалы заняты. Выберите другую дату."
          : "Нет доступных интервалов на выбранную дату."
        : null
      : null

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {submitError ? (
        <Notice tone="negative" variant="tinted">
          {submitError}
        </Notice>
      ) : null}

      {slotsError ? (
        <Notice tone="negative" variant="tinted">
          {slotsError}
        </Notice>
      ) : null}

      {slotsHint ? (
        <Notice tone="neutral" variant="tinted">
          {slotsHint}
        </Notice>
      ) : null}

      {locked ? (
        <div className="rounded-2 border border-default bg-surface-secondary/60 px-4 py-3">
          <p className="font-semibold text-title-1">Стол №{locked.id}</p>
          <p className="text-body-small text-secondary mt-1">
            {formatSeatsCount(locked.seatsCount)} · выбран в зале
          </p>
        </div>
      ) : (
        <Controller
          control={form.control}
          name="tableId"
          render={({ field, fieldState }) => (
            <Select
              label="Стол"
              placeholder={props.tablesLoading ? "Загрузка…" : "Выберите стол"}
              items={tableItems}
              isRequired
              isDisabled={props.tablesLoading || tableItems.length === 0}
              isLoading={props.tablesLoading}
              fullWidth
              value={field.value > 0 ? String(field.value) : null}
              onChange={(key) => {
                const next = typeof key === "string" && key.trim() !== "" ? Number(key) : 0
                field.onChange(Number.isFinite(next) && next > 0 ? next : 0)
              }}
              isInvalid={Boolean(fieldState.invalid && fieldState.error)}
              errorMessage={fieldState.error?.message}
            >
              <Collection items={tableItems}>
                {(item) => (
                  <Select.Item id={item.id} textValue={item.label}>
                    {item.label}
                  </Select.Item>
                )}
              </Collection>
            </Select>
          )}
        />
      )}

      <Controller
        control={form.control}
        name="reservationDate"
        render={({ field, fieldState }) => (
          <DatePicker
            className="w-full"
            label="Дата визита"
            granularity="day"
            isDisabledDateInput
            isRequired
            minValue={now(getLocalTimeZone())}
            value={field.value ? parseDate(field.value) : null}
            onChange={(date) => field.onChange(date ? date.toString() : "")}
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="slotStart"
        render={({ field, fieldState }) => (
          <Select
            label="Время"
            placeholder={
              slotsLoading
                ? "Загрузка интервалов…"
                : tableId <= 0 || !reservationDate
                  ? "Сначала выберите стол и дату"
                  : "Выберите время"
            }
            items={slotItems}
            isRequired
            isDisabled={slotsLoading || slotItems.length === 0 || tableId <= 0 || !reservationDate}
            isLoading={slotsLoading}
            fullWidth
            value={field.value ? field.value : null}
            onChange={(key) => field.onChange(typeof key === "string" ? key : "")}
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          >
            <Collection items={slotItems}>
              {(item) => (
                <Select.Item id={item.id} textValue={item.label}>
                  {item.label}
                </Select.Item>
              )}
            </Collection>
          </Select>
        )}
      />

      <Controller
        control={form.control}
        name="customerName"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Имя"
            fullWidth
            placeholder="Как к вам обращаться"
            isRequired
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={form.control}
        name="customerPhone"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Телефон"
            fullWidth
            placeholder="+7 (999) 123-45-67"
            isRequired
            isInvalid={Boolean(fieldState.invalid && fieldState.error)}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          isDisabled={
            form.formState.isSubmitting ||
            (!locked && (props.tables.length === 0 || props.tablesLoading))
          }
        >
          {form.formState.isSubmitting ? "Отправка…" : "Забронировать стол"}
        </Button>
      </div>
    </form>
  )
}
