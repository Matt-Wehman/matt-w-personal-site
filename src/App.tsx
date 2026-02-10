import { ThemeProvider } from '@/context/theme-provider'
import Home from './sections/home'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Home />
    </ThemeProvider>
  )
}

export default App
