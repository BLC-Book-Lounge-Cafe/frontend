import { useEffect, useMemo, useState } from "react"
import { Collection } from "react-aria-components"
import {
  NOISE_LEVELS,
  updateSpaceState,
  type ParsedAtmospherePatch,
} from "entities/atmosphere"
import { Modal } from "shared/ui/overlays/modal"
import { Dialog } from "shared/ui/overlays/dialog"
import { Button } from "shared/ui/button"
import { Notice } from "shared/ui/notice"
import { TextField } from "shared/ui/text-field"
import { Select } from "shared/ui/pickers/select"
import { toastManager } from "shared/ui/toast"
import Icon from "shared/ui/Icon"
import { parseEditAtmosphereError } from "../lib/parse-edit-atmosphere-error"

type EditAtmosphereModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  atmosphere: ParsedAtmospherePatch | null
  onSaved?: () => void
}

const noiseLevelItems = NOISE_LEVELS.map((entry) => ({
  id: String(entry.value),
  label: entry.label,
}))

export function EditAtmosphereModal(props: EditAtmosphereModalProps) {
  const [description, setDescription] = useState("")
  const [noiseLevel, setNoiseLevel] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const initialNoiseLevel = useMemo(() => {
    if (typeof props.atmosphere?.noiseLevel !== "number") return null
    return String(props.atmosphere.noiseLevel)
  }, [props.atmosphere?.noiseLevel])

  useEffect(() => {
    if (!props.isOpen) return
    setDescription(props.atmosphere?.description ?? "")
    setNoiseLevel(initialNoiseLevel)
    setSubmitError(null)
  }, [props.isOpen, props.atmosphere?.description, initialNoiseLevel])

  const handleSave = async () => {
    const trimmedDescription = description.trim()
    if (!trimmedDescription) {
      setSubmitError("Заполните описание обстановки.")
      return
    }

    if (noiseLevel == null || noiseLevel === "") {
      setSubmitError("Выберите уровень шума из списка.")
      return
    }

    const level = Number(noiseLevel)
    if (!Number.isInteger(level) || level < 0 || level > 5) {
      setSubmitError("Уровень шума должен быть от 0 до 5.")
      return
    }

    setSubmitError(null)
    setSaving(true)

    try {
      await updateSpaceState({
        description: trimmedDescription,
        noiseLevel: level,
      })
      toastManager.show({
        title: "Атмосфера обновлена",
        message: "Описание и уровень шума сохранены.",
        color: "success",
      })
      props.onSaved?.()
      props.onOpenChange(false)
    } catch (err) {
      setSubmitError(
        parseEditAtmosphereError(err, "Не удалось сохранить изменения."),
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <Dialog UNSAFE_className="w-full max-w-md">
        <Dialog.Header>
          <div className="flex justify-between items-start gap-2">
            <Dialog.Header.Title>Атмосфера в кафе</Dialog.Header.Title>
            <Button
              variant="plain"
              size="sm"
              onPress={() => props.onOpenChange(false)}
              aria-label="Закрыть"
              isDisabled={saving}
            >
              <Icon name="xmark" />
            </Button>
          </div>
        </Dialog.Header>

        <Dialog.Content UNSAFE_className="space-y-4">
          {submitError ? (
            <Notice tone="negative" variant="tinted">
              {submitError}
            </Notice>
          ) : null}

          <TextField
            label="Опишите обстановку в кафе и за окном."
            placeholder="Например: за окном солнечный день…"
            value={description}
            onChange={setDescription}
            isMultiLine
            rowsForMultiline={4}
            fullWidth
            isRequired
            isDisabled={saving}
          />

          <Select
            label="Уровень шума"
            description="Установите значение из выпадающего списка."
            placeholder="Выберите уровень шума"
            items={noiseLevelItems}
            isRequired
            fullWidth
            isDisabled={saving}
            value={noiseLevel}
            onChange={(key) => setNoiseLevel(typeof key === "string" ? key : null)}
          >
            <Collection items={noiseLevelItems}>
              {(item) => (
                <Select.Item id={item.id} textValue={item.label}>
                  {item.label}
                </Select.Item>
              )}
            </Collection>
          </Select>
        </Dialog.Content>

        <Dialog.Footer>
          <Button
            variant="filled"
            tone="accent"
            fullWidth
            isDisabled={saving}
            onPress={handleSave}
          >
            {saving ? "Сохранение…" : "Сохранить"}
          </Button>
        </Dialog.Footer>
      </Dialog>
    </Modal>
  )
}
