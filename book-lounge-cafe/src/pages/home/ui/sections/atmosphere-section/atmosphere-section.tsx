import { Container } from "shared/ui/container"
import { Progress } from "shared/ui/progress"
import { Button } from "shared/ui/button"

export function AtmosphereSection() {
  const crowdLevel = 70
  const noiseLevel = 30

  const getCrowdLabel = (value: number) => {
    if (value < 30) return "Спокойно"
    if (value < 70) return "Умеренно"
    return "Оживлённо"
  }

  const getNoiseLabel = (value: number) => {
    if (value < 30) return "Тихо, как в библиотеке"
    if (value < 70) return "Приятный фон"
    return "Живое общение"
  }

  return (
    <section id="atmosphere" className="py-section-mobile md:py-section bg-surface-secondary">
      <Container>
        <h2 className="text-title-1 text-center mb-8">Атмосфера в кафе</h2>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="bg-surface-primary rounded-2 p-6 shadow-md">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-body font-medium">Загруженность</p>
                  <span className="text-body-small text-accent font-semibold">
                    {getCrowdLabel(crowdLevel)}
                  </span>
                </div>
                <Progress.Bar value={crowdLevel} tone="accent" size="md" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-body font-medium">Уровень шума</p>
                  <span className="text-body-small text-accent font-semibold">
                    {getNoiseLabel(noiseLevel)}
                  </span>
                </div>
                <Progress.Bar value={noiseLevel} tone="accent" size="md" />
              </div>
            </div>
          </div>

          <div className="bg-surface-primary rounded-2 p-6 shadow-md">
            <h3 className="text-title-3 mb-4">Музыкальная атмосфера</h3>
            <p className="text-body-small text-secondary mb-4">Сейчас играет</p>

            <div className="flex items-center gap-4 mb-4">
              <Button variant="tinted" size="md" rounded="full" UNSAFE_className="shrink-0">
                <span className="text-xl">▶</span>
              </Button>
              <div className="flex-1 min-w-0">
                <p className="text-body font-medium truncate">Название трека</p>
                <p className="text-caption text-secondary truncate">Исполнитель</p>
              </div>
            </div>

            <p className="text-caption text-secondary text-center mt-4">
              Плейлист из Яндекс.Музыки будет добавлен позже
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
