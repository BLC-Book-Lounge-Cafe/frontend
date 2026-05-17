export type User = {
  isAdmin: boolean
}

export type UserDtoLike = {
  isAdmin?: boolean | null
}

export function parseUserFromResponse(data: UserDtoLike): User {
  return {
    isAdmin: Boolean(data.isAdmin),
  }
}
