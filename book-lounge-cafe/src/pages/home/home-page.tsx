import { ReservationModal, useReservationModal } from "features/reservation"
import { Footer } from "widgets/footer"
import { Header } from "widgets/header"
import { HeroSection } from "./ui/sections/hero-section"
import { MenuSection } from "./ui/sections/menu-section"
import { CafeSection } from "./ui/sections/cafe-section"
import { LibrarySection } from "./ui/sections/library-section"
import { AtmosphereSection } from "./ui/sections/atmosphere-section"
import { ReservationSection } from "./ui/sections/reservation-section"

export function HomePage() {
  const { isOpen, open, onOpenChange } = useReservationModal()

  return (
    <>
      <Header onReservationPress={open} />
      <main>
        <HeroSection />
        <MenuSection />
        <CafeSection />
        <LibrarySection />
        <AtmosphereSection />
        <ReservationSection onOpenReservation={open} />
      </main>
      <Footer onReservationPress={open} />
      <ReservationModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  )
}
