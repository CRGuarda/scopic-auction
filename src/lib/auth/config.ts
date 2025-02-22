import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const nextAuthOptions: NextAuthConfig = {
  theme: {
    buttonText: 'Sign in Scopic',
    logo: 'https://cdn.scopicsoftware.com/wp-content/uploads/2020/03/cropped-Scopic-Icon-192x192.png',
    brandColor: '#fff',
  },
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.isAdmin
      }
      return token
    },
    session({ session, token }) {
      session.user.isAdmin = token.isAdmin
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        name: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      authorize: async (credentials) => {
        const users = [
          {
            name: 'user1',
            password: 'user1',
            isAdmin: false,
          },
          {
            name: 'user2',
            password: 'user2',
            isAdmin: false,
          },
          {
            name: 'admin1',
            password: 'admin1',
            isAdmin: true,
          },
          {
            name: 'admin2',
            password: 'admin2',
            isAdmin: true,
          },
        ]
        const user = users.find((user) => user.name === credentials.name && user.password === credentials.password)
        return user
          ? {
              name: user.name,
              isAdmin: user.isAdmin,
            }
          : null
      },
    }),
  ],
}
