import { Header } from '@/components/features/header'
import { CurrentWeatherForecastSection } from '@/components/sections/current-weather-forecast'
import { ManyDayWeatherForecastSection } from '@/components/sections/many-day-weather-forecast'
import { Analytics } from '@vercel/analytics/react'

function App() {
	return (
		<>
			<Header />
			<main className='container mt-4 mb-16 flex max-w-screen-xl flex-col gap-8 px-2'>
				<CurrentWeatherForecastSection />
				<ManyDayWeatherForecastSection />
			</main>
			<footer className='text-muted-foreground mb-8 text-center text-sm'>
				© {new Date().getFullYear()} Vartec
				<a href='https://github.com/vartec-chs/sky-cast-react'>
					<img className='ml-2 inline w-8' src='/github-mark.svg' alt='' />
				</a>
			</footer>
			<Analytics />
		</>
	)
}

export default App
