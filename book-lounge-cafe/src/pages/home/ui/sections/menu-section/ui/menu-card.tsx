import type { MenuViewCategory } from "entities/menu"
import { CardActionButton } from "shared/ui/card-action-button"

type MenuCardProps = MenuViewCategory & {
  isAdmin?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export function MenuCard(props: MenuCardProps) {
  const { title, items, isAdmin = false, onEdit, onDelete } = props

  return (
    <article className="flex min-h-[341px] flex-col bg-surface-primary rounded-2 p-6 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-title-2 font-bold text-center pb-3">
        {title}
      </h3>
      <ul className="mt-6 space-y-3">
        {items.map((item, index) => (
          <li
            key={item.id != null ? String(item.id) : `${item.name}-${index}`}
            className="flex items-end justify-between gap-2"
          >
            <span className="shrink-0 text-body">{item.name}</span>
            <span className="mb-1 flex-1 border-b border-dotted border-accent/30" aria-hidden />
            <span className="shrink-0 text-body font-semibold text-accent">{item.price} ₽</span>
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div className="mt-auto flex justify-center gap-[4.5rem] pt-[1.875rem]">
          <CardActionButton
            icon="pencil"
            label={`Редактировать категорию ${title}`}
            onClick={onEdit}
          />
          <CardActionButton
            icon="trash"
            label={`Удалить категорию ${title}`}
            onClick={onDelete}
          />
        </div>
      )}
    </article>
  )
}
