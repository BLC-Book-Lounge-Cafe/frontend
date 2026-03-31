import heroBg from "shared/assets/images/cup-of-tea-with-tree.png"
import tgIcon from "shared/assets/images/tg.png"
import { Button } from "shared/ui/button"
import { Container } from "shared/ui/container"

export function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center flex flex-col py-8 md:py-16"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <Container>
        <div className="relative z-10 px-4 flex flex-col gap-8 md:gap-24">
          <h1 className="text-title-1 text-white text-center">
            Приветствуем Вас в кафе-библиотеке Тихий угол!
          </h1>
          <p className="text-white/90 max-w-md text-center mx-auto mt-4">
            Здесь Вы сможете порадовать себя ароматным кофе под интересную книгу, провести время с друзьями или коллегами, создать свое уютное рабочее пространство.
            Наши мастера регулярно стараются сделать Ваш день лучше и атмосфернее.
          </p>
          <div className="flex justify-end">
            <Button variant="plain">
              <img src={tgIcon} alt="Telegram" className="w-20 h-20" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}