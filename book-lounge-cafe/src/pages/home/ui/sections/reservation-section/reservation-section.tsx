import { ReservationLeaveRequestButton } from "entities/reservation"
import { Container } from "shared/ui/container"
import { Card } from "shared/ui/card"

type ReservationSectionProps = {
  onOpenReservation: () => void
}

export function ReservationSection(props: ReservationSectionProps) {
  return (
    <section id="booking" className="py-section-mobile md:py-section">
      <Container>
        <h2 className="text-title-1 text-center mb-8">Забронировать стол</h2>
        <Card rounded={2} UNSAFE_className="p-6 max-w-2xl mx-auto">
          <p className="text-body text-center mb-6 text-secondary">
            Хотите прийти в удобное время? Оставьте заявку — администратор перезвонит и поможет
            выбрать стол и время.
          </p>
          <div className="flex justify-center">
            <ReservationLeaveRequestButton placement="section" onPress={props.onOpenReservation} />
          </div>
        </Card>
      </Container>
    </section>
  )
}
