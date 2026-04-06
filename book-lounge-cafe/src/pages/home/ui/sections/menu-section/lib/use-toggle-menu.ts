import { useState } from "react"

export const useToggleMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return { isMenuOpen, toggleMenu }
}