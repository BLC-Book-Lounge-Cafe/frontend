import { useState } from "react"
import { useMenu } from "entities/menu"
import { useCurrentUser } from "entities/user"
import { Container } from "shared/ui/container"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { Progress } from "shared/ui/progress"
import { classes } from "shared/lib/classes"
import { MenuCard } from "./ui/menu-card"

type AddCategoryButtonProps = {
  className?: string
}

function AddCategoryButton(props: AddCategoryButtonProps) {
  return (
    <button
      type="button"
      aria-label="Добавить категорию"
      className={classes(
        "inline-flex size-14 md:size-16 items-center justify-center rounded-full bg-black text-white shadow-md transition-colors hover:bg-black/85 active:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        props.className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7 md:size-8">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </button>
  )
}

export function MenuSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const { categories, loading, error } = useMenu()
  const { isAdmin } = useCurrentUser()

  return (
    <section id="menu" className="py-section-mobile md:py-section">
      <Container>
        <h2 className="text-title-1 text-center mb-8">Наше меню</h2>

        <div className="relative flex items-center justify-center mb-8">
          <Button
            size="lg"
            rounded
            onPress={() => setIsMenuOpen(!isMenuOpen)}
            UNSAFE_className="min-w-64"
          >
            {isMenuOpen ? "Скрыть меню" : "Смотреть всё меню"}
          </Button>

          {isAdmin && (
            <AddCategoryButton className="hidden sm:inline-flex absolute right-0 top-1/2 -translate-y-1/2" />
          )}
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {categories.map((category) => (
                  <MenuCard key={category.id} {...category} isAdmin={isAdmin} />
                ))}
              </div>

              {isAdmin && (
                <div className="flex justify-center mt-6 sm:hidden">
                  <AddCategoryButton />
                </div>
              )}
            </>
          ))}
      </Container>
    </section>
  )
}
