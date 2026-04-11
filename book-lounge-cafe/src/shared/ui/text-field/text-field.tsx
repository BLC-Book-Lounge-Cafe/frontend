import React from "react"
import type { LabelableProps } from "@react-types/shared"
import type { TextFieldProps, ContextValue } from "react-aria-components"
import { TextField, TextFieldContext, useContextProps } from "react-aria-components"
// shared
import type { UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import type { FieldLabelProps } from "shared/ui/field"
import { Field } from "shared/ui/field"

export type AppTextFieldProps = (
  UnsafeStyles
  & LabelableProps
  & Pick<FieldLabelProps, "necessityIndicator" | "contextualHelp" | "isBold">
  & Omit<TextFieldProps, "children" | "style" | "className" | "validate" | "validationBehavior"> & {
    inputСssStyles?: string
    fullWidth?: boolean
    placeholder?: string
    description?: React.ReactNode
    errorMessage?: React.ReactNode
    iconStart?: React.ReactNode
    iconEnd?: React.ReactNode
    isMultiLine?: boolean
    rowsForMultiline?: number
  }
)

const AppTextFieldContext = TextFieldContext as React.Context<
  ContextValue<Partial<AppTextFieldProps>, HTMLInputElement>
>

function AppTextField(props: AppTextFieldProps, ref: React.ForwardedRef<HTMLInputElement>) {
  [props, ref] = useContextProps(props, ref, AppTextFieldContext)

  const {
    label,
    isBold,
    placeholder = "Введите информацию",
    necessityIndicator,
    description,
    errorMessage,
    fullWidth,
    iconStart,
    iconEnd,
    isMultiLine,
    rowsForMultiline = 8,
    ...textFieldProps
  } = props

  return (
    <TextField
      {...textFieldProps}
      ref={ref}
      validationBehavior="aria"
      className={classes(
        "inline-flex flex-col min-w-0",
        fullWidth && "w-full",
        props.UNSAFE_className,
      )}
    >
      {(textFieldState) => (
        <>
          <Field.Label
            isBold={isBold}
            isRequired={textFieldState.isRequired}
            necessityIndicator={necessityIndicator}
            contextualHelp={props.contextualHelp}>
            {label}
          </Field.Label>

          <Field.Group
            UNSAFE_className={classes(
              isMultiLine && "h-fit px-3 py-2",
            )}
            role="presentation"
            isInvalid={textFieldState.isInvalid}
            isDisabled={textFieldState.isDisabled}
          >
            {isMultiLine ? (
              <Field.TextArea
                UNSAFE_style={{ resize: "none" }}
                placeholder={placeholder}
                rows={rowsForMultiline}
              />
            ) : (
              <>
                {iconStart}
                <Field.Input
                  UNSAFE_className={props.inputСssStyles}
                  placeholder={placeholder}
                />
                {iconEnd}
              </>
            )}
          </Field.Group>

          {!textFieldState.isInvalid ? (
            <Field.Description>
              {description}
            </Field.Description>
          ) : (
            <Field.Error>
              {errorMessage}
            </Field.Error>
          )}
        </>
      )}
    </TextField>
  )
}

const _AppTextField = React.forwardRef(AppTextField)
export { _AppTextField as AppTextField }
