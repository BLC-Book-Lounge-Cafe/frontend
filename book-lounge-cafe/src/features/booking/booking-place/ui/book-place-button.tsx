import { Button } from "shared/ui/button"
import { scrollToTableBookingSection } from "../lib/scroll-to-table-booking"

type BookPlaceButtonProps = {
  /** Если не задан — плавный скролл к блоку бронирования столов на главной. */
  onPress?: () => void
}

export function BookPlaceButton(props: BookPlaceButtonProps) {
  return (
    <Button
      variant="filled"
      tone="accent"
      size="lg"
      onPress={() => (props.onPress ?? scrollToTableBookingSection)()}
    >
      Забронировать место
    </Button>
  )
}
