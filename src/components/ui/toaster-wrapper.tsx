import { Toaster } from 'react-hot-toast'

import { useTheme } from './theme-provider'

export const ToasterWrapper = () => {
	const { theme } = useTheme()
	return (
		<Toaster
			toastOptions={{
				style: {
					color: theme === 'dark' ? '#fff' : '#000',
					backgroundColor: theme === 'dark' ? '#0a0d10' : '#fff',
					borderRadius: '1rem',
				},
			}}
		/>
	)
}
