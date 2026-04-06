import { HeroSection } from "./ui/sections/hero-section"
import { MenuSection } from "./ui/sections/menu-section"
import { CafeSection } from "./ui/sections/cafe-section"
import { LibrarySection } from "./ui/sections/library-section"
import { AtmosphereSection } from "./ui/sections/atmosphere-section"

export function HomePage() {
  return (
    <>
      <HeroSection />
      <MenuSection />
      <CafeSection />
      <LibrarySection />
      <AtmosphereSection />
    </>
  )
}
