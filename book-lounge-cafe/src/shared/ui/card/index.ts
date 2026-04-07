import { Card } from "./card"
import { CardHeader } from "./card-header"
import { CardContent } from "./card-content"
import { CardFooter } from "./card-footer"

export type { CardProps } from "./card"
export type { CardHeaderProps } from "./card-header"
export type { CardContentProps } from "./card-content"
export type { CardFooterProps } from "./card-footer"

const _Card = Object.assign(Card, ({
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
}))

export { _Card as Card }
