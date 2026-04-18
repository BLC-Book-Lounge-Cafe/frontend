import React from "react"
import type { LabelableProps } from "@react-types/shared"
import type { SearchFieldProps, ContextValue } from "react-aria-components"
import { SearchField, SearchFieldContext, Button, useContextProps } from "react-aria-components"
// shared
import { type UnsafeStyles } from "shared/model/types/unsafe-styles"
import { classes } from "shared/lib/classes"
import { Field, type FieldLabelProps } from "shared/ui/field"
import Icon from "shared/ui/Icon"

export type AppSearchFieldProps = (
  UnsafeStyles
  & LabelableProps
  & Pick<FieldLabelProps, "contextualHelp">
  & Omit<SearchFieldProps, "className" | "style" | "children" | "isRequired" | "validate" | "validationBehavior"> & {
    fullWidth?: boolean
    placeholder?: string
    description?: React.ReactNode
    errorMessage?: React.ReactNode
    /** Скрыть кнопку очистки (крестик справа). По умолчанию показывается, если поле не пустое. */
    hideClearButton?: boolean
  }
)

const AppSearchFieldContext = SearchFieldContext as React.Context<
  ContextValue<Partial<AppSearchFieldProps>, HTMLInputElement>
>

function AppSearchField(props: AppSearchFieldProps, ref: React.ForwardedRef<HTMLInputElement>) {
  [props, ref] = useContextProps(props, ref, AppSearchFieldContext)

  const {
    label,
    placeholder = "Введите запрос",
    description,
    errorMessage,
    fullWidth,
    hideClearButton,
    ...searchFieldProps
  } = props

  return (
    <SearchField
      {...searchFieldProps}
      style={props.UNSAFE_style}
      validationBehavior="aria"
      className={() => classes(
        "inline-flex flex-col min-w-0",
        fullWidth && "w-full",
        props.UNSAFE_className,
      )}
    >
      {(searchState) => (
        <>
          <Field.Label contextualHelp={props.contextualHelp}>
            {label}
          </Field.Label>

          <Field.Group
            role="presentation"
            isDisabled={searchState.isDisabled}
            isInvalid={searchState.isInvalid}
            UNSAFE_className="px-0"
          >
            <Icon
              name="search"
              UNSAFE_className="mx-2"
            />
            <Field.Input
              placeholder={placeholder}
            />
            {(!hideClearButton && !searchState.isEmpty && !props.isReadOnly) && (
              <Button
                slot="clear"
                className="shrink-0 flex items-center justify-center h-full w-10 text-tertiary hover:text-primary outline-none"
              >
                <Icon name="xmark" UNSAFE_className="w-4 h-4" />
              </Button>
            )}
          </Field.Group>

          {!searchState.isInvalid ? (
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
    </SearchField>
  )
}

const _AppSearchField = React.forwardRef(AppSearchField)
export { _AppSearchField as AppSearchField }
