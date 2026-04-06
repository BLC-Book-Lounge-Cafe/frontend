export type MenuItem = {
  name: string
  price: string
}

export type MenuCategory = {
  id: number
  title: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 1,
    title: "Напитки",
    items: [
      { name: "Эспрессо", price: "150" },
      { name: "Американо", price: "170" },
      { name: "Капучино", price: "200" },
      { name: "Латте", price: "220" },
      { name: "Раф", price: "240" },
      { name: "Чай черный", price: "150" },
      { name: "Чай зеленый", price: "150" },
      { name: "Какао", price: "180" },
    ],
  },
  {
    id: 2,
    title: "Десерты",
    items: [
      { name: "Чизкейк", price: "280" },
      { name: "Тирамису", price: "320" },
      { name: "Брауни", price: "250" },
      { name: "Макарон", price: "120" },
      { name: "Круассан", price: "180" },
      { name: "Эклер", price: "200" },
    ],
  },
  {
    id: 3,
    title: "Сэндвичи",
    items: [
      { name: "Сэндвич с курицей", price: "320" },
      { name: "Сэндвич с лососем", price: "380" },
      { name: "Вегетарианский", price: "280" },
      { name: "Клаб-сэндвич", price: "350" },
      { name: "Панини", price: "300" },
    ],
  },
]
