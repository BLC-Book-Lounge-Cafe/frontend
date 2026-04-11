import { ReservationLeaveRequestButton } from "entities/reservation"
import { Container } from "shared/ui/container"

type FooterProps = {
  onReservationPress?: () => void
}

export function Footer(props: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacts" className="bg-surface-tertiary text-white py-16">
      <Container>
        <div className="flex flex-col items-center gap-8 md:justify-between md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <h3 className="text-title-3 mb-4">Контакты</h3>
            <div className="space-y-2 text-body-small">
              <p>📍 г. Москва, ул. Примерная, д. 1</p>
              <p>
                📞{" "}
                <a href="tel:+79991234567" className="hover:text-accent transition-colors">
                  +7 (999) 123-45-67
                </a>
              </p>
              <p>
                ✉️{" "}
                <a href="mailto:info@cafe-library.ru" className="hover:text-accent transition-colors">
                  info@cafe-library.ru
                </a>
              </p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-title-3 mb-4">Режим работы</h3>
            <div className="space-y-2 text-body-small">
              <p>Пн-Пт: 8:00 - 22:00</p>
              <p>Сб-Вс: 10:00 - 23:00</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-title-3 mb-4">Социальные сети</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-2xl hover:text-accent transition-colors" aria-label="VK">
                🔵
              </a>
              <a href="#" className="text-2xl hover:text-accent transition-colors" aria-label="Telegram">
                ✈️
              </a>
              <a href="#" className="text-2xl hover:text-accent transition-colors" aria-label="Instagram">
                📷
              </a>
            </div>
            <ReservationLeaveRequestButton
              placement="footer"
              onPress={props.onReservationPress}
            />
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-body-small text-white/60">
            © {currentYear} Кафе-библиотека "Тихий угол". Все права защищены.
          </p>
        </div>
      </Container>
    </footer>
  )
}
