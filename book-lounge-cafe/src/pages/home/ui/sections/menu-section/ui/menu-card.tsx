import type { MenuViewCategory } from "entities/menu"

type MenuCardProps = MenuViewCategory

export function MenuCard(props: MenuCardProps) {
  const { title, items } = props

  return (
    <article className="bg-surface-primary rounded-2 p-6 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-title-2 font-bold mb-6 text-center border-b border-accent/20 pb-3">
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={`${item.name}-${index}`} className="flex justify-between items-end">
            <span className="text-body">{item.name}</span>
            <span className="border-b border-dotted border-accent/30 flex-1 mx-2 mb-1" />
            <span className="text-body font-semibold text-accent">{item.price} ₽</span>
          </li>
        ))}
      </ul>
    </article>
  )
}
