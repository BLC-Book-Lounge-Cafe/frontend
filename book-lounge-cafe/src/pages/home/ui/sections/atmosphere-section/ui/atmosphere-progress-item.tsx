import { Progress } from "shared/ui/progress"

export type AtmosphereProgressItemListProps = {
  id: number
  image: string
  imageAlt: string
  title: string
  progressValue: number
}

export function AtmosphereProgressItemList(props: AtmosphereProgressItemListProps) {
  const { image, imageAlt, title, progressValue } = props

  return (
    <li className="flex flex-col gap-4 md:flex-row md:items-center">
      <div className="flex items-center gap-2">
        <img src={image} alt={imageAlt} className="w-h-20 h-20" />
        <p>{title}</p>
      </div>
      <Progress.Bar value={progressValue} UNSAFE_className="w-full min-w-72 min-h-2 xs:min-w-xxs" />
    </li>
  )
}