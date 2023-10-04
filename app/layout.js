export const metadata = {
  title: 'Reiver Namer',
  description: 'Find your Reiver Name',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{display:'flex'}}>{children}</body>
    </html>
  )
}
