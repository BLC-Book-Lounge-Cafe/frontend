import { Dialog, DialogTrigger, Modal, ModalOverlay } from "react-aria-components"
import { Button } from "shared/ui/button"
import { Field } from "shared/ui/field"
import Icon from "shared/ui/Icon"

type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
  step: number
  formData: {
    date: string
    time: string
    name: string
    phone: string
    email: string
  }
  onNextStep: () => void
  onPrevStep: () => void
  onUpdateField: (field: string, value: string) => void
  onSubmit: () => void
}

export function BookingModal(props: BookingModalProps) {
  const { isOpen, onClose, step, formData, onNextStep, onPrevStep, onUpdateField, onSubmit } = props

  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <Modal className="bg-surface-primary rounded-2 p-8 max-w-md w-full shadow-2xl relative">
        <Dialog className="outline-none">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors"
          >
            <Icon name="xmark" size="sm" />
          </button>

          <h2 className="text-title-2 font-bold mb-6">
            Бронирование {step === 1 ? "- Дата" : step === 2 ? "- Время" : "- Контакты"}
          </h2>

          {step === 1 && (
            <div className="space-y-4">
              <Field.Group>
                <Field.Label>Выберите дату</Field.Label>
                <Field.Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => onUpdateField("date", e.target.value)}
                />
              </Field.Group>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field.Group>
                <Field.Label>Выберите время</Field.Label>
                <Field.Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => onUpdateField("time", e.target.value)}
                />
              </Field.Group>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Field.Group>
                <Field.Label isRequired>Имя</Field.Label>
                <Field.Input
                  value={formData.name}
                  onChange={(e) => onUpdateField("name", e.target.value)}
                  placeholder="Ваше имя"
                />
              </Field.Group>

              <Field.Group>
                <Field.Label isRequired>Телефон</Field.Label>
                <Field.Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => onUpdateField("phone", e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </Field.Group>

              <Field.Group>
                <Field.Label>Email</Field.Label>
                <Field.Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onUpdateField("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </Field.Group>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button variant="outline" size="md" rounded fullWidth onPress={onPrevStep}>
                Назад
              </Button>
            )}
            <Button
              size="md"
              rounded
              fullWidth
              onPress={step === 3 ? onSubmit : onNextStep}
              isDisabled={
                (step === 1 && !formData.date) ||
                (step === 2 && !formData.time) ||
                (step === 3 && (!formData.name || !formData.phone))
              }
            >
              {step === 3 ? "Забронировать" : "Далее"}
            </Button>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}
