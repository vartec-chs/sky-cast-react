import { ManyDayWeatherForecastSection } from './components/sections/many-day-weather-forecast'
import { CurrentWeatherForecastSection } from '@/components/sections/current-weather-forecast'
import { Header } from '@/components/shared/header'
import { useIpLocality } from './hooks/useIpLocality'

function App() {
	// const {locality, getLocality} = useIpLocality()


	return (
		<>
			<Header />
			<main className='container px-4 mt-8 max-w-screen-xl flex flex-col gap-8 mb-16'>
				<CurrentWeatherForecastSection />
				<ManyDayWeatherForecastSection />
			</main>
		</>
	)
}

export default App
