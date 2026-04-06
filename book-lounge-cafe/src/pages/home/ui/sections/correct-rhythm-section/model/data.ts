import coffeeBeansImg from "shared/assets/images/coffee-beans.png"
import cakeImg from "shared/assets/images/cake.png"
import knifeForkImg from "shared/assets/images/knife-fork.png"

export const features = [
  {
    image: coffeeBeansImg,
    alt: "Кофейные зёрна",
    text: "Свежий кофе для бодрого утра",
  },
  {
    image: cakeImg,
    alt: "Выпечка",
    text: "Ароматная выпечка для хорошего настроения",
  },
  {
    image: knifeForkImg,
    alt: "Вилка и нож",
    text: "Сытный обед для Вашего продуктивного дня",
  },
] as const