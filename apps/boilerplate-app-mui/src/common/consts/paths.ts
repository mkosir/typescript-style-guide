export const paths = {
  HOME: '/',
  USERS: '/users',
  USERS_ADD: '/users/add',
  USERS_DETAILS: (username: string) => `/users/${username}`,
} as const;
