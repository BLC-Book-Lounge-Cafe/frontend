import { CorrectRhythmSection } from "./ui/sections/correct-rhythm-section"
import { HeroSection } from "./ui/sections/hero-section"
import { MenuSection } from "./ui/sections/menu-section/menu-section"
import { AtmosphereSection } from "./ui/sections/atmosphere-section"

export function HomePage() {
  return (
    <div className="flex flex-col gap-4 sm:gap-8 lg:gap-20">
      <HeroSection />
      <CorrectRhythmSection />
      <MenuSection />
      <AtmosphereSection />
    </div>
  )
}
