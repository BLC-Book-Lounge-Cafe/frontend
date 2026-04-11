import { workingHoursRows } from "../model/venue-info"

type WorkingHoursListProps = {
  variant: "compact" | "verbose"
}

export function WorkingHoursList(props: WorkingHoursListProps) {
  return (
    <>
      {workingHoursRows.map((row) => (
        <p key={row.daysShort}>
          {props.variant === "compact"
            ? `${row.daysShort}: ${row.time}`
            : `${row.daysLong}: ${row.time}`}
        </p>
      ))}
    </>
  )
}
