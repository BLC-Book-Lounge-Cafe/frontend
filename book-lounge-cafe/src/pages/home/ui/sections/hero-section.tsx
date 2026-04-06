import { Container } from "shared/ui/container"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070)`,
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
        </div>
      </Container>
    </section>
  )
}
