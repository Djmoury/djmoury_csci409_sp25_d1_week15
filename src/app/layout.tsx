// app/layout.tsx
export const metadata = {
  title: 'Next.js Layout App',
  description: 'Learning layouts with the App Router',
 };
 export default function RootLayout({ children }: { children:
 React.ReactNode }) {
  return (
  <html lang="en">
  <body>
  <header style={{ padding: '1rem', backgroundColor: '#eee' }}>
  <h1>My Layout</h1>
  <nav>
  <a href="/">Home</a> | <a href="/about">About</a> | <a href="/terms">Terms</a>
  </nav>
  </header>
  <main style={{ padding: '1rem' }}>{children}</main>
  <footer style={{ padding: '1rem', backgroundColor: '#eee' }}>
  <p>© 2025 My App</p>
  </footer>
  </body>
  </html>
  );
 }