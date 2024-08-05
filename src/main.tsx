import App from './App.tsx'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider.tsx'
import { ToasterWrapper } from '@/components/ui/toaster-wrapper.tsx'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
		<ToasterWrapper />
		<App />
	</ThemeProvider>,
)
