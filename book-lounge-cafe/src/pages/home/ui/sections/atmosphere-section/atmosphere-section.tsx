import { Container } from "shared/ui/container";
import { atmosphereData } from "./model/atmosphere-data";
import { AtmosphereProgressItemList } from "./ui/atmosphere-progress-item";

export function AtmosphereSection() {
  return (
    <section>
      <Container>
        <h2 className="text-center text-title-1">Атмосфера в кафе</h2>
        <p>
          Идет дождь, в зале тепло и пахнет корицей. Идеальное время для чтения с чашкой какао
        </p>
        <ul className="flex flex-col gap-4">
          {atmosphereData.map((item) => (
            <AtmosphereProgressItemList key={item.id} {...item} />
          ))}
        </ul>
      </Container>
    </section>
  )
}