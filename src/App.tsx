import { ThemeProvider } from '@/context/theme-provider';
import TransitPathSvgContainer from './components/shared/transit-paths/transit-path-svg-container';
import { BLUE_PATH } from './constants/transit-paths';
import About from './sections/about';
import Home from './sections/home';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TransitPathSvgContainer paths={[BLUE_PATH]} fixedPaths />
      <Home />
      <About />
    </ThemeProvider>
  )
}

export default App
