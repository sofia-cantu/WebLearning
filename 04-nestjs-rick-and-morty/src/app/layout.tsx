//layout.tsx
import type { Metadata } from 'next'
import './globals.css'
<<<<<<< Updated upstream
//import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
//import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Act Rick and Morty',
  description: "pink, pink, pink",
=======
import { getServerSession } from "next-auth"

import { useSession } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Act Rick and Morty',
  description: "pink pink pink",
>>>>>>> Stashed changes
}

export default async function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode,
  session: any,
}>) {

<<<<<<< Updated upstream
  //const session = await getServerSession();

  return (
    <html lang='en'>
      <body className='bg-white'>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
=======
  const session = await getServerSession()

  return (
    <html lang='en'>

        <body className='bg-white'>{children}</body>

>>>>>>> Stashed changes
    </html>
  )
}
