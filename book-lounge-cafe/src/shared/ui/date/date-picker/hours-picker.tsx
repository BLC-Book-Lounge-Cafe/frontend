import { Time } from "@internationalized/date"
import React from "react"
import type {
  Selection,
  TimeValue } from "react-aria-components"
import {
  ListBox,
  ListBoxItem,
} from "react-aria-components"
// shared
import type { Nullable } from "shared/model/types/nullable"
import { classes } from "shared/lib/classes"
import { dateFormatter } from "shared/lib/formatters/date-formatter"

const getTimeSlots = () => {
  const slots = []

  for (let i = 0; i < 48; i++) {
    const hours = Math.floor(i / 2)
    const minutes = i % 2 === 0 ? 0 : 30
    const timeValue = new Date()
    timeValue.setHours(hours, minutes, 0, 0)

    slots.push({
      id: hours + ":" + minutes,
      hours,
      minutes,
      label: dateFormatter.format(timeValue, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    })
  }

  return slots
}

type HoursPickerProps = {
  value: Nullable<TimeValue>
  onChange: (time: Time) => void
}

export function HoursPicker(props: HoursPickerProps) {
  const { onChange, value } = props

  const timeSlots = React.useMemo(() => getTimeSlots(), [])

  const handleSelectionChange = (keys: Selection) => {
    const selectedKey = Array.from(keys)[0]
    const selectedSlot = timeSlots.find((slot) => slot.id === selectedKey)
    if (!selectedSlot) return

    const timeValue = new Time(selectedSlot.hours, selectedSlot.minutes)
    onChange(timeValue)
  }

  const getSelectedKey = () => {
    if (!value) return undefined
    const slotId = value.hour + ":" + value.minute
    return new Set([slotId])
  }

  return (
    <div>
      <span>Время</span>
      <ListBox
        selectionMode="single"
        onSelectionChange={handleSelectionChange}
        selectedKeys={getSelectedKey()}
        items={timeSlots}
        className={classes(
          "p-1 rounded-1 space-y-1 min-w-24 max-h-32 overflow-y-auto sm:max-h-72",
        )}
      >
        {(item) => (
          <ListBoxItem
            id={item.id}
            className={(state) =>
              classes(
                "px-1 py-2 rounded-1 cursor-pointer",
                state.isFocusVisible && "ring-4",
                state.isSelected && "bg-accent text-white",
                state.isHovered && "text-accent bg-accent/10",
              )}
          >
            {item.label}
          </ListBoxItem>
        )}
      </ListBox>
    </div>
  )
}
