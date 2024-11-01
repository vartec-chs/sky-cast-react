import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App.tsx'
import './globals.css'
import { ThemeProvider } from '@/components/ui/theme-provider.tsx'
import ReactDOM from 'react-dom/client'

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
}

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
		<Toaster
			toastOptions={{
				className: ' text-black dark:text-white bg-muted rounded-lg shadow-md max-md:w-full',
			}}
		/>
		<QueryClientProvider client={queryClient}>
			<App />
		</QueryClientProvider>
	</ThemeProvider>,
)
