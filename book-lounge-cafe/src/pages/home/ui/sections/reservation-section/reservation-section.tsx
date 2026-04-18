import { useTables, tablesImage } from "entities/table"
import { ReservationLeaveRequestButton } from "entities/reservation"
import { BookingTableModal, BookingTablesGrid, useBookingTableModal } from "features/booking/booking-table"
import { Container } from "shared/ui/container"
import { Card } from "shared/ui/card"

type ReservationSectionProps = {
  onOpenReservation: () => void
}

export function ReservationSection(props: ReservationSectionProps) {
  const { tables, loading, error } = useTables()
  const bookingModal = useBookingTableModal()

  return (
    <section id="booking" className="py-section-mobile md:py-section">
      <Container>
        <h2 className="text-title-1 text-center mb-4">Забронировать стол</h2>
        <p className="text-body text-center text-secondary max-w-xl mx-auto mb-8">
          Нажмите на стол в зале, затем выберите дату и время.
        </p>

        <Card rounded={2} UNSAFE_className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
          <BookingTablesGrid
            tables={tables}
            loading={loading}
            error={error}
            onTablePress={bookingModal.open}
          />

          <img src={tablesImage} alt="Столики для бронирования" className="w-full h-auto rounded-2 object-cover" />

          <div className="border-t border-default space-y-4">
            <p className="text-body-small text-center text-secondary">
              Нужна помощь с выбором или особые пожелания? Оставьте заявку — администратор перезвонит.
            </p>
            <div className="flex justify-center">
              <ReservationLeaveRequestButton placement="section" onPress={props.onOpenReservation} />
            </div>
          </div>
        </Card>
      </Container>

      <BookingTableModal
        isOpen={bookingModal.isOpen}
        onOpenChange={bookingModal.onOpenChange}
        table={bookingModal.table}
        tables={tables}
      />
    </section>
  )
}
