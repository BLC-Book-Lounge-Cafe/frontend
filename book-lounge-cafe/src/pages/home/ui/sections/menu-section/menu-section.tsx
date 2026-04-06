import { useState } from "react"
import { Container } from "shared/ui/container"
import { Button } from "shared/ui/button"
import { menuCategories } from "./model/menu-data"
import { MenuCard } from "./ui/menu-card"

export function MenuSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <section id="menu" className="py-section-mobile md:py-section">
      <Container>
        <h2 className="text-title-1 text-center mb-8">Наше меню</h2>

        <div className="flex justify-center mb-8">
          <Button
            size="lg"
            rounded
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            UNSAFE_className="min-w-64"
          >
            {isMenuOpen ? "Скрыть меню" : "Смотреть всё меню"}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {menuCategories.map((category) => (
              <MenuCard key={category.id} {...category} />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
