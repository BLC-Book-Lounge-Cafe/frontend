import { useTables } from "entities/table"
import { ReservationModal, useReservationModal } from "features/reservation"
import {
  BookingTableModal,
  useBookingTableModal,
} from "features/booking/booking-table"
import {
  AdminRequestsModal,
  useAdminRequestsModal,
} from "features/admin/view-requests"
import { Footer } from "widgets/footer"
import { Header } from "widgets/header"
import { HeroSection } from "./ui/sections/hero-section"
import { MenuSection } from "./ui/sections/menu-section"
import { CafeSection } from "./ui/sections/cafe-section"
import { LibrarySection } from "./ui/sections/library-section"
import { AtmosphereSection } from "./ui/sections/atmosphere-section"
import { ReservationSection } from "./ui/sections/reservation-section"

export function HomePage() {
  const reservationModal = useReservationModal()
  const bookingModal = useBookingTableModal()
  const adminRequestsModal = useAdminRequestsModal()
  const { tables, loading: tablesLoading, error: tablesError } = useTables()

  return (
    <>
      <Header onReservationPress={reservationModal.open} />
      <main>
        <HeroSection onOpenAdminRequests={adminRequestsModal.open} />
        <MenuSection />
        <CafeSection
          onOpenReservation={reservationModal.open}
          onOpenAdminRequests={adminRequestsModal.open}
        />
        <LibrarySection />
        <AtmosphereSection />
        <ReservationSection
          onOpenReservation={reservationModal.open}
          onOpenAdminRequests={adminRequestsModal.open}
          onBookTable={bookingModal.open}
          tables={tables}
          tablesLoading={tablesLoading}
          tablesError={tablesError}
        />
      </main>
      <Footer
        onReservationPress={reservationModal.open}
        onOpenAdminRequests={adminRequestsModal.open}
      />

      <ReservationModal
        isOpen={reservationModal.isOpen}
        onOpenChange={reservationModal.onOpenChange}
      />

      <BookingTableModal
        isOpen={bookingModal.isOpen}
        onOpenChange={bookingModal.onOpenChange}
        table={bookingModal.table}
        tables={tables}
        initialCustomer={bookingModal.initialCustomer}
      />

      <AdminRequestsModal
        isOpen={adminRequestsModal.isOpen}
        onOpenChange={adminRequestsModal.onOpenChange}
        onBookForCustomer={(request) =>
          bookingModal.openForCustomer({
            customerName: request.customerName,
            customerPhone: request.customerPhone,
          })
        }
      />
    </>
  )
}
