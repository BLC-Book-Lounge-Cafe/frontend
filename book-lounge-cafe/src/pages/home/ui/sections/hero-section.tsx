import { Container } from "shared/ui/container"
import { heroImage } from "entities/hero"
import { BookPlaceButton } from "features/booking/booking-place"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[50vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <Container UNSAFE_className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center text-white space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-hero font-bold leading-tight animate-fade-in">
            Твоё место силы: кофе и книги
          </h1>
          <p className="text-lg sm:text-xl lg:text-title-2 text-white/95 leading-relaxed animate-slide-up">
            Атмосфера, где можно читать, работать и пить отличный кофе
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 animate-slide-up">
            <BookPlaceButton />
          </div>
        </div>
      </Container>
    </section>
  )
}
