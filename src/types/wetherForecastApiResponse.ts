export type CurrentWeatherForecastApiResponse = {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	current_units: {
		time: string
		interval: string
		temperature_2m: string
		relative_humidity_2m: string
		apparent_temperature: string
		is_day: string
		precipitation: string
		weather_code: string
		wind_speed_10m: string
		wind_direction_10m: string
	}
	current: {
		time: string
		interval: number
		temperature_2m: number
		relative_humidity_2m: number
		apparent_temperature: number
		is_day: number
		precipitation: number
		weather_code: number
		wind_speed_10m: number
		wind_direction_10m: number
	}
}

/* {
  "latitude": 51.6875,
  "longitude": 39.1875,
  "generationtime_ms": 0.0140666961669922,
  "utc_offset_seconds": 10800,
  "timezone": "Europe/Moscow",
  "timezone_abbreviation": "MSK",
  "elevation": 160,
  "daily_units": {
    "time": "iso8601",
    "temperature_2m_max": "°C"
  },
  "daily": {
    "time": [
      "2024-08-03",
      "2024-08-04"
    ],
    "temperature_2m_max": [26.3, 18.4]
  }
} */

export type YesterdayTemperatureApiResponse = {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	hourly: {
		time: string[]
		temperature_2m: number[]
	}
}

export type HourlyWeatherForecastApiResponse = {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	hourly_units: {
		time: string
		temperature_2m: string
		precipitation_probability: string
		weather_code: string
	}
	hourly: {
		time: string[]
		temperature_2m: number[]
		precipitation_probability: number[]
		weather_code: number[]
	}
}

export type DailyWeatherForecastApiResponse = {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	daily_units: {
		time: string
		weather_code: string
		temperature_2m_max: string
		temperature_2m_min: string
		precipitation_probability_max: string
		wind_speed_10m_max: string
	}
	daily: {
		time: string[]
		weather_code: number[]
		temperature_2m_max: number[]
		temperature_2m_min: number[]
		precipitation_probability_max: number[]
		wind_speed_10m_max: number[]
		wind_direction_10m_dominant: number[]
	}
}
