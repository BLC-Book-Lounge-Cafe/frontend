import peopleImg from "../assets/people.png"
import soundImg from "../assets/sound.png"
import { type AtmosphereProgressItemListProps } from "../ui/atmosphere-progress-item";

const atmosphereData: AtmosphereProgressItemListProps[] = [
  {
    id: 1,
    image: peopleImg,
    imageAlt: "People",
    title: "Уровень загруженности:",
    progressValue: 70,
  },
  {
    id: 2,
    image: soundImg,
    imageAlt: "Sound",
    title: "Уровень шума:",
    progressValue: 30,
  },
]

export { atmosphereData }