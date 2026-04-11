import { useState } from "react"
import { VenueAddressLine, WorkingHoursList } from "entities/cafe-venue"
import { Container } from "shared/ui/container"
import { Button } from "shared/ui/button"

type CafeSectionProps = {
  onOpenReservation?: () => void
}

export function CafeSection(props: CafeSectionProps) {
  const [showMap, setShowMap] = useState(true)

  return (
    <section id="cafe" className="py-section-mobile md:py-section bg-surface-secondary">
      <Container>
        <h2 className="text-title-1 text-center mb-8">О кафе</h2>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-surface-primary rounded-2 p-6 shadow-md">
            <h3 className="text-title-3 mb-4">Добро пожаловать!</h3>
            <p className="text-body leading-relaxed mb-4">
              Кафе-библиотека "Тихий угол" — это уютное пространство, где можно насладиться
              ароматным кофе, погрузиться в чтение любимой книги или поработать в спокойной
              атмосфере. Мы создали место, где каждый найдет свой уголок для вдохновения.
            </p>
            <div className="border-t border-accent/20 pt-4">
              <h4 className="text-title-3 mb-3">Режим работы</h4>
              <div className="space-y-2 text-body">
                <WorkingHoursList variant="verbose" />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              rounded
              fullWidth
              onPress={() => props.onOpenReservation?.()}
            >
              Связаться с администратором
            </Button>
            <Button
              variant="tinted"
              size="lg"
              rounded
              fullWidth
              onPress={() => setShowMap(!showMap)}
            >
              {showMap ? "Скрыть адрес" : "Показать адрес"}
            </Button>
          </div>

          {showMap && (
            <div className="bg-surface-primary rounded-2 p-6 shadow-md animate-fade-in">
              <h4 className="text-title-3 mb-4">Наш адрес</h4>
              <div className="space-y-3 text-body">
                <VenueAddressLine />
                <p className="text-body-small text-secondary">
                  Интерактивная карта будет добавлена позже
                </p>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
