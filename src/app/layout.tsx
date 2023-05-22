

import './globals.css'
import Chat from "./components/Chat"
import Providers from './components/Providers'

export const metadata = {
  title: 'Chatbot',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
        <body>
          {/* Chatkomponente in das Layout rendern */}
          <Chat />
          {children}
          </body>
      </Providers>
    </html>
  )
}
