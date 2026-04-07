import React from "react"
import type { LabelableProps } from "@react-types/shared"
import type { SelectProps, ListBoxProps, ContextValue } from "react-aria-components"
import { Select, SelectContext, SelectStateContext, SelectValue, Button, ListBox } from "react-aria-components"
import type { SelectionMode } from "@react-types/select"

// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import Icon from "shared/ui/Icon"
import { Field, type FieldLabelProps } from "shared/ui/field"
import { Popover } from "shared/ui/overlays/popover"
import { Card } from "shared/ui/card"
import { Progress } from "shared/ui/progress"

export type AppSelectProps<T extends object, M extends SelectionMode> = (
  UnsafeStyles &
  LabelableProps &
  Omit<SelectProps<T, M>, "children" | "style" | "className" | "validate" | "validationBehavior"> &
  Pick<FieldLabelProps, "necessityIndicator" | "contextualHelp" | "isBold"> &
  Pick<ListBoxProps<T>, "items"> & {
    isLoading?: boolean
    isVisibleClearButton?: boolean
    children: React.ReactNode | ((item: T) => React.ReactNode)
    fullWidth?: boolean
    placeholder?: string
    description?: React.ReactNode
    errorMessage?: React.ReactNode
  }
)

const AppSelectContext = SelectContext as React.Context<
  ContextValue<Partial<AppSelectProps<any>>, HTMLDivElement>
>

function AppSelect<T extends object, M extends SelectionMode = "single">(props: AppSelectProps<T, M>, ref: React.ForwardedRef<HTMLDivElement>) {
  const {
    items,
    label,
    placeholder = "Выберите элемент...",
    isBold,
    isLoading,
    isVisibleClearButton = false,
    children,
    description,
    errorMessage,
    necessityIndicator,
    contextualHelp,
    fullWidth,
  } = props

  return (
    <Select
      {...props}
      ref={ref}
      style={props.UNSAFE_style}
      placeholder={placeholder}
      validationBehavior="aria"
      className={classes(
        "inline-flex flex-col min-w-[unset]",
        fullWidth && "w-full",
        props.UNSAFE_className,
      )}
    >
      {(selectState) => (
        <>
          <Field.Label
            isBold={isBold}
            isRequired={selectState.isRequired}
            necessityIndicator={necessityIndicator}
            contextualHelp={contextualHelp}>
            {label}
          </Field.Label>

          <Field.Group
            role="presentation"
            isActive={selectState.isOpen}
            isDisabled={selectState.isDisabled}
            isInvalid={selectState.isInvalid}
            UNSAFE_className="px-0"
          >
            <Button className="flex items-center w-full h-full pl-3 text-left">
              <SelectValue className={(state) => classes(
                "flex-1 text-primary truncate",
                selectState.isInvalid && "!text-negative",
                state.isPlaceholder && "text-tertiary",
                state.selectedItem && "text-accent",
              )} />

              <SelectStateContext.Consumer>
                {(state) => (
                  Boolean(state?.selectedItems?.length) && isVisibleClearButton && (
                    <Button
                      slot={null}
                      isDisabled={selectState.isDisabled}
                      data-slot="clear"
                      preventFocusOnPress
                      excludeFromTabOrder
                      className="shrink-0 flex items-center justify-center h-full w-10 rounded-3 outline-none"
                      onPress={() => state?.setValue(null)}
                    >
                      <Icon
                        name="xmark"
                        UNSAFE_className="w-4 h-4"
                      />
                    </Button>
                  )
                )}
              </SelectStateContext.Consumer>
              <Icon
                name="chevron"
                UNSAFE_className={classes("mx-2", selectState.isOpen && "rotate-180")}
              />
              {isLoading && (
                <Progress.Circle
                  isIndeterminate
                  size="sm"
                  UNSAFE_className="mx-2"
                />
              )}
            </Button>
          </Field.Group>

          {!selectState.isInvalid ? (
            <Field.Description>
              {description}
            </Field.Description>
          ) : (
            <Field.Error>
              {errorMessage}
            </Field.Error>
          )}

          <Popover showArrow={false}>
            <Card
              border
              rounded={1}
              UNSAFE_className="min-w-[--trigger-width] max-w-xxs max-h-xxs p-1.5 bg-surface-primary overflow-y-auto"
            >
              <ListBox
                items={items}
                shouldFocusWrap
                className="flex flex-col gap-1"
              >
                {children}
              </ListBox>
            </Card>
          </Popover>
        </>
      )}
    </Select>
  )
}

const _AppSelect = Object.assign(
  React.forwardRef(AppSelect), ({
    Context: AppSelectContext,
  }),
)

export { _AppSelect as AppSelect }
