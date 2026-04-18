import { useState } from "react"
import { useMenu } from "entities/menu"
import { Container } from "shared/ui/container"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { Progress } from "shared/ui/progress"
import { MenuCard } from "./ui/menu-card"

export function MenuSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const { categories, loading, error } = useMenu()

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

        {isMenuOpen &&
          (loading ? (
            <div className="flex justify-center py-12">
              <Progress.Circle isIndeterminate />
            </div>
          ) : error ? (
            <Notice tone="negative" variant="tinted" UNSAFE_className="mb-6">
              {error}
            </Notice>
          ) : categories.length === 0 ? (
            <Notice tone="warning" variant="tinted">
              Меню пока пусто.
            </Notice>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {categories.map((category) => (
                <MenuCard key={category.id} {...category} />
              ))}
            </div>
          ))}
      </Container>
    </section>
  )
}
