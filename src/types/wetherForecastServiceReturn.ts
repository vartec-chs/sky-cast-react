export type DayWeatherForecast = {
	date: string
	nameDay: string
	minTemp: number
	maxTemp: number
	weatherCode: number
	weatherIcon: string
	weatherDescription: string
	precipitationProbability: number
	windSpeed: number
	windDirection: number
}

export type DailyWeatherForecast = {
	daily: DayWeatherForecast[]
	averageMinTemp: number
	averageMaxTemp: number
	averagePrecipitation: number
	averageWindSpeed: number
	averageWindDirection: number
}

export type HourWeatherForecast = {
	isCurrentTime: boolean
	time: string
	temperature: number
	precipitationProbability: number
	weatherCode: number
	weatherIcon: string
	weatherDescription: string
}

export type HourlyWeatherForecast = {
	hourly: HourWeatherForecast[]
	isCurrentTimeItmeId: number
}

export type CurrentWeatherForecast = {
	nameDay: string
	elevation: number
	time: string
	interval: number
	yesterdayTemperature: number
	temperature: number
	relativeHumidity: number
	apparentTemperature: number
	isDay: boolean
	precipitation: number
	weatherCode: number
	weatherIcon: string
	windSpeed: number
	windDirection: number
	weatherDescription: string
}
