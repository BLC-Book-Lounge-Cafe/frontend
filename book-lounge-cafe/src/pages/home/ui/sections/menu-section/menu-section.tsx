import { CardMenu } from "entities/menu"
import { Container } from "shared/ui/container"
import imgCoffee from "./assets/hot-coffee-cup.png"
import imgSoup from "./assets/mushroom-cream-soup.png"
import imgDessert from "./assets/chocolate-cupcakes.png"
import imgMain from "./assets/pasta-chanterelles.png"
import { Button } from "shared/ui/button"
import { useToggleMenu } from "./lib/use-toggle-menu"

type MenuCategory = {
  image: string
  imageAlt: string
  title: string
  itemLabel: string
}

const categories: MenuCategory[] = [
  {
    image: imgCoffee,
    imageAlt: "Чашка горячего кофе",
    title: "Кофейня",
    itemLabel: "Кофе",
  },
  {
    image: imgSoup,
    imageAlt: "Крем-суп с грибами",
    title: "Супы",
    itemLabel: "Суп",
  },
  {
    image: imgDessert,
    imageAlt: "Шоколадные капкейки",
    title: "Десерты",
    itemLabel: "Десерт",
  },
  {
    image: imgMain,
    imageAlt: "Паста с грибами",
    title: "Горячее",
    itemLabel: "Паста",
  },
]

const PLACEHOLDER_PRICE = "200"

export function MenuSection() {
  const { isMenuOpen, toggleMenu } = useToggleMenu()

  return (
    <section className="flex flex-col gap-4">
      <Container>
        <h2 className="text-center text-title-1">Все самое вкусное в нашем меню!</h2>
      </Container>
      <Button fullWidth onPress={toggleMenu} UNSAFE_className="py-8 text-title-2 rounded-0">
        {isMenuOpen ? "Скрыть меню" : "Показать меню"}
      </Button>
      {isMenuOpen && (
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2
              id="menu-section-title"
              className="text-center font-bold text-title-2"
            >
              МЕНЮ
            </h2>
          </div>

          <ul className="mt-10 grid list-none grid-cols-1 gap-10 p-0 md:mt-14 md:grid-cols-2 md:gap-x-10 md:gap-y-12">
            {categories.map((cat) => (
              <li key={cat.title}>
                <CardMenu
                  image={cat.image}
                  imageAlt={cat.imageAlt}
                  title={cat.title}
                  items={Array.from({ length: 6 }, () => ({
                    name: cat.itemLabel,
                    price: PLACEHOLDER_PRICE,
                  }))}
                />
              </li>
            ))}
          </ul>
        </Container>
      )}
    </section>
  )
}
