import type { Metadata } from 'next'
import './globals.css'
//import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
//import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Act Rick and Morty',
  description: "pink, pink, pink",
}

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode,
  session: any,
}>) {

  //const session = await getServerSession();

  return (
    <html lang='en'>
      <body className='bg-white'>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
