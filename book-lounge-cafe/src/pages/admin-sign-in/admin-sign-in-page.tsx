import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { heroImage } from "entities/hero"
import { useUserStore } from "entities/user"
import {
  AdminSignInForm,
  parseAdminSignInError,
  type AdminSignInFormValues,
} from "features/auth/sign-in-admin"
import { Card } from "shared/ui/card"
import { Container } from "shared/ui/container"
import { Notice } from "shared/ui/notice"
import { toastManager } from "shared/ui/toast"
import Icon from "shared/ui/Icon"

export function AdminSignInPage() {
  const navigate = useNavigate()
  const signInAdmin = useUserStore((s) => s.signInAdmin)

  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleSubmit = async (values: AdminSignInFormValues) => {
    setApiError(null)
    setIsLoading(true)
    try {
      await signInAdmin({
        login: values.login,
        password: values.password,
      })
      toastManager.show({
        title: "Вход выполнен",
        message: "Вы вошли как администратор.",
        color: "success",
      })
      navigate("/", { replace: true })
    } catch (err) {
      setApiError(parseAdminSignInError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center py-12"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <Container size="sm" UNSAFE_className="relative z-10">
        <div className="flex flex-col items-center gap-6">
          <Link
            to="/"
            aria-label="На главную"
            className="inline-flex items-center text-white transition-transform hover:scale-105"
          >
            <Icon name="logo" size={16} />
          </Link>

          <Card
            rounded={3}
            UNSAFE_className="w-full max-w-md p-6 md:p-8 space-y-6 shadow-lg"
          >
            <div className="space-y-2 text-center">
              <h1 className="text-title-2">Вход для администратора</h1>
              <p className="text-body-small text-secondary">
                Введите логин и пароль, чтобы перейти в режим администратора.
              </p>
            </div>

            {apiError ? (
              <Notice tone="negative" variant="tinted" role="alert">
                {apiError}
              </Notice>
            ) : null}

            <AdminSignInForm onSubmit={handleSubmit} isLoading={isLoading} />

            <div className="text-center text-body-small">
              <Link
                to="/"
                className="text-accent hover:underline"
              >
                Вернуться на главную
              </Link>
            </div>
          </Card>
        </div>
      </Container>
    </main>
  )
}
