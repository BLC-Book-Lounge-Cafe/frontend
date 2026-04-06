import { useState } from "react"

type BookingFormData = {
  date: string
  time: string
  name: string
  phone: string
  email: string
}

export function useBookingModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  })

  const open = () => {
    setIsOpen(true)
    setStep(1)
  }

  const close = () => {
    setIsOpen(false)
    setStep(1)
    setFormData({
      date: "",
      time: "",
      name: "",
      phone: "",
      email: "",
    })
  }

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateFormData = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log("Booking submitted:", formData)
    // TODO: Send to API
    close()
  }

  return {
    isOpen,
    step,
    formData,
    open,
    close,
    nextStep,
    prevStep,
    updateFormData,
    handleSubmit,
  }
}
