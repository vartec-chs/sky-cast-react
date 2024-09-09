import { CurrentWeatherForecastSection } from '@/components/sections/current-weather-forecast'
import { ManyDayWeatherForecastSection } from '@/components/sections/many-day-weather-forecast'
import { Header } from '@/components/shared/header'
import { Analytics } from '@vercel/analytics/react'

function App() {
	return (
		<>
			<Header />
			<main className='container px-4 mt-8 max-w-screen-xl flex flex-col gap-16 mb-16'>
				<CurrentWeatherForecastSection />
				<ManyDayWeatherForecastSection />
			</main>
			<footer className='text-center text-sm text-muted-foreground mb-8'>
				© 2024 Vartec
				<a href='https://github.com/vartec-chs/sky-cast-react'>
					<img className='inline ml-2 w-8' src='/github-mark.svg' alt='' />
				</a>
			</footer>
			<Analytics />
		</>
	)
}

export default App
