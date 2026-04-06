export type CardMenuItem = {
  name: string
  price: string
}

export type CardMenuProps = {
  image: string
  imageAlt: string
  title: string
  items: CardMenuItem[]
}

type CardMenuRowProps = {
  name: string
  price: string
}

function CardMenuRow(props: CardMenuRowProps) {
  const { name, price } = props
  return (
    <li className="flex w-full items-end gap-2 text-white">
      <span className="shrink-0 pb-0.5 italic text-body-small md:text-body">{name}</span>
      <span
        className="mb-1 min-h-0 min-w-0 flex-1 border-b border-dotted border-white/45"
        aria-hidden
      />
      <span className="shrink-0 pb-0.5 tabular-nums italic text-body-small md:text-body">
        {price}
      </span>
    </li>
  )
}

export function CardMenu(props: CardMenuProps) {
  const { image, imageAlt, title, items } = props

  return (
    <article className="flex flex-col overflow-hidden text-white bg-black/25">
      <div>
        <img
          src={image}
          alt={imageAlt}
          className="aspect-[16/10] w-full object-cover brightness-[0.88] contrast-[0.98]"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <h3 className="text-left font-sans text-title-2 font-bold italic">
          {title}
        </h3>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {items.map((item, i) => (
            <CardMenuRow
              key={`${item.name}-${item.price}-${i}`}
              name={item.name}
              price={item.price}
            />
          ))}
        </ul>
      </div>
    </article>
  )
}
