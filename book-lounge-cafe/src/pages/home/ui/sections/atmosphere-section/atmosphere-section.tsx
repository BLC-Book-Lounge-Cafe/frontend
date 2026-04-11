import { Container } from "shared/ui/container"
import { Progress } from "shared/ui/progress"
import { Notice } from "shared/ui/notice"
import { getNoiseLevelLabel, getWorkloadLevelLabel, useAtmosphere } from "entities/atmosphere"
import { Card } from "shared/ui/card"

export function AtmosphereSection() {
  const {data,loading,error} = useAtmosphere()

  return (
    <section id="atmosphere" className="py-section-mobile md:py-section bg-surface-secondary">
      <Container>
        <h2 className="text-title-1 text-center mb-8">Атмосфера в кафе</h2>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Progress.Circle isIndeterminate />
          </div>
        ) : error ? (
          <Notice
            tone="negative"
            variant="tinted"
            UNSAFE_className="mb-6"
          >
            {error}
          </Notice>
        ) : (
          <>
            <p className="text-center mb-8">{data?.description || "Описание не найдено"}</p>

            <div className="space-y-8 transition-opacity">
              <Card rounded={2} UNSAFE_className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-wrap justify-between items-center mb-3">
                      <p className="text-body font-medium">Загруженность {typeof data?.crowdLevel === "number" ? `${data.crowdLevel}%` : ""}</p>
                      <span className="text-body-small text-accent font-semibold">
                        {typeof data?.crowdLevel === "number" ? getWorkloadLevelLabel(data.crowdLevel) : "Не определена"}
                      </span>
                    </div>
                    <Progress.Bar value={data?.crowdLevel || 0} tone="accent" size="md" />
                  </div>

                  <div>
                    <div className="flex flex-wrap justify-between items-center mb-3">
                      <p className="text-body font-medium">Уровень шума {typeof data?.noiseLevel === "number" ? `${data.noiseLevel}%` : ""}</p>
                      <span className="text-body-small text-accent font-semibold">
                        {typeof data?.noiseLevel === "number" ? getNoiseLevelLabel(data.noiseLevel) : "Не определена"}
                      </span>
                    </div>
                    <Progress.Bar value={data?.noiseLevel || 0} tone="accent" size="md" />
                  </div>
                </div>
              </Card>

              <Card rounded={2} UNSAFE_className="p-6">
                <h3 className="text-title-3 mb-4">Музыкальная атмосфера</h3>
                <p className="text-body-small text-secondary mb-4">Сейчас играет</p>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xl">▶</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-body font-medium truncate">{data?.trackTitle || "Название трека не определено"}</p>
                    <p className="text-caption text-secondary truncate">{data?.trackAuthors || "Исполнитель не определен"}</p>
                  </div>
                </div>

                {data?.trackImage ? (
                  <img
                    src={data.trackImage}
                    alt={data?.trackTitle || "Название трека не определено"}
                    className="w-60 object-cover rounded-2"
                  />
                ) : (
                  <Notice
                    tone="warning"
                  >
                    Обложка трека не найдена
                  </Notice>
                )}
              </Card>
            </div>
          </>
        )}

      </Container>
    </section>
  )
}
