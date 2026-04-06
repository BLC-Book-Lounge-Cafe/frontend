import playIcon from "shared/assets/images/play.png"
import { Container } from "shared/ui/container"
import { features } from "./model/data"
import { Button } from "shared/ui/button"

export function CorrectRhythmSection() {
  return (
    <section>
      <Container UNSAFE_className="flex flex-col gap-4">
        <h2 className="text-center font-bold text-title-1">
          Настроимся на правильный ритм
        </h2>

        <div>
          <p className="mb-2 text-left text-body-small">
            Сейчас звучит
          </p>
          <div className="flex min-h-14 items-center gap-4 rounded-2 px-4 py-3 shadow-sm">
            <Button
              variant="plain"
            >
              <img src={playIcon} alt="Иконка воспроизведения" className="block h-8 w-8" loading="lazy" />
            </Button>
            <div>
              <p className="text-caption font-medium">Исполнитель</p>
              <p className="text-caption">Песня</p>
            </div>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((item) => (
            <li key={item.text} className="flex flex-col items-center text-center">
              <img
                src={item.image}
                alt={item.alt}
                className="h-14 w-14 object-contain md:h-16 md:w-16"
                loading="lazy"
              />
              <p className="mt-4 max-w-[14rem] text-body-small">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
