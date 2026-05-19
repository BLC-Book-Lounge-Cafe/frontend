import { tablesImage, type CafeTable } from "entities/table"
import { ReservationLeaveRequestButton } from "entities/reservation"
import { useCurrentUser } from "entities/user"
import { TABLE_BOOKING_SECTION_ID } from "features/booking/booking-place"
import { BookingTablesGrid } from "features/booking/booking-table"
import { Container } from "shared/ui/container"
import { Card } from "shared/ui/card"
import { Button } from "shared/ui/button"

type ReservationSectionProps = {
  onOpenReservation: () => void
  onOpenBookedTables?: () => void
  onOpenAdminRequests?: () => void
  onBookTable: (table: CafeTable) => void
  tables: CafeTable[]
  tablesLoading: boolean
  tablesError: string | null
}

export function ReservationSection(props: ReservationSectionProps) {
  const { isAdmin } = useCurrentUser()

  return (
    <section id={TABLE_BOOKING_SECTION_ID} className="py-section-mobile md:py-section">
      <Container>
        <h2 className="text-title-1 text-center mb-4">Забронировать стол</h2>
        {isAdmin ? (
          <div className="flex justify-center mb-8">
            <Button
              variant="filled"
              tone="accent"
              size="lg"
              rounded
              onPress={() => props.onOpenBookedTables?.()}
            >
              Посмотреть забронированные столики
            </Button>
          </div>
        ) : (
          <p className="text-body text-center text-secondary max-w-xl mx-auto mb-8">
            Нажмите на стол в зале, затем выберите дату и время.
          </p>
        )}

        <Card rounded={2} UNSAFE_className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
          <BookingTablesGrid
            tables={props.tables}
            loading={props.tablesLoading}
            error={props.tablesError}
            onTablePress={props.onBookTable}
          />

          <img src={tablesImage} alt="Столики для бронирования" className="w-full h-auto rounded-2 object-cover" />

          <div className="border-t border-default space-y-4">
            <p className="text-body-small text-center text-secondary">
              Нужна помощь с выбором или особые пожелания? Оставьте заявку — администратор перезвонит.
            </p>
            <div className="flex justify-center">
              {isAdmin ? (
                <Button
                  variant="filled"
                  tone="accent"
                  size="lg"
                  rounded
                  onPress={() => props.onOpenAdminRequests?.()}
                >
                  Посмотреть заявки
                </Button>
              ) : (
                <ReservationLeaveRequestButton placement="section" onPress={props.onOpenReservation} />
              )}
            </div>
          </div>
        </Card>
      </Container>
    </section>
  )
}

