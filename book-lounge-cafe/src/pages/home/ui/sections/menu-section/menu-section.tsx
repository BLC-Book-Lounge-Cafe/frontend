import { useState } from "react"
import { useMenu } from "entities/menu"
import { useCurrentUser } from "entities/user"
import { AddMenuCategoryModal, useAddMenuCategoryModal } from "features/admin/add-menu-category"
import {
  DeleteMenuCategoryModal,
  useDeleteMenuCategoryModal,
} from "features/admin/delete-menu-category"
import { EditMenuCategoryModal, useEditMenuCategoryModal } from "features/admin/edit-menu-category"
import { Container } from "shared/ui/container"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { Progress } from "shared/ui/progress"
import { classes } from "shared/lib/classes"
import { MenuCard } from "./ui/menu-card"

type AddCategoryButtonProps = {
  className?: string
  onClick?: () => void
}

function AddCategoryButton(props: AddCategoryButtonProps) {
  return (
    <button
      type="button"
      aria-label="Добавить категорию"
      onClick={props.onClick}
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
  const { categories, loading, error, refetch } = useMenu()
  const { isAdmin } = useCurrentUser()
  const addMenuModal = useAddMenuCategoryModal()
  const editMenuModal = useEditMenuCategoryModal()
  const deleteMenuModal = useDeleteMenuCategoryModal()

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
            <AddCategoryButton
              className="hidden sm:inline-flex absolute right-0 top-1/2 -translate-y-1/2"
              onClick={addMenuModal.open}
            />
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
            <>
              <Notice tone="warning" variant="tinted">
                Меню пока пусто.
              </Notice>
              {isAdmin && (
                <div className="flex justify-center mt-6 sm:hidden">
                  <AddCategoryButton onClick={addMenuModal.open} />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {categories.map((category) => (
                  <MenuCard
                    key={category.id}
                    {...category}
                    isAdmin={isAdmin}
                    onEdit={() => editMenuModal.open(category)}
                    onDelete={() => deleteMenuModal.open(category)}
                  />
                ))}
              </div>

              {isAdmin && (
                <div className="flex justify-center mt-6 sm:hidden">
                  <AddCategoryButton onClick={addMenuModal.open} />
                </div>
              )}
            </>
          ))}

        {isAdmin ? (
          <>
            <AddMenuCategoryModal
              isOpen={addMenuModal.isOpen}
              onOpenChange={addMenuModal.onOpenChange}
              onSaved={() => void refetch()}
            />
            <EditMenuCategoryModal
              isOpen={editMenuModal.isOpen}
              onOpenChange={editMenuModal.onOpenChange}
              category={editMenuModal.category}
              onSaved={() => void refetch()}
            />
            <DeleteMenuCategoryModal
              isOpen={deleteMenuModal.isOpen}
              onOpenChange={deleteMenuModal.onOpenChange}
              category={deleteMenuModal.category}
              onDeleted={() => void refetch()}
            />
          </>
        ) : null}
      </Container>
    </section>
  )
}
