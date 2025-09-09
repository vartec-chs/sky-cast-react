export type PropsWithClassName = {
	className?: string
}

export type Coordinates = {
	lat: number
	lon: number
}

export type WeatherServiceArgs = {
	weatherModel?: string
} & Coordinates

export enum WeatherModel {
	JmaEamless = 'jma_seamless',
	MetnoEamless = 'metno_seamless',
	GemEamless = 'gem_seamless',
	BomAccessGlobal = 'bom_access_global',
	CmaGrapesGlobal = 'cma_grapes_global',
	KnmiSeamless = 'knmi_seamless',
	DmiSeamless = 'dmi_seamless',
	EcmwfIfs025 = 'ecmwf_ifs025',
	MeteoFranceSeamless = 'meteofrance_seamless',
	GfsSeamless = 'gfs_seamless',
	IconSeamless = 'icon_seamless',
}

export const UVIndexColors = [
	{ color: 'text-green-500', label: 'Низкий' },
	{ color: 'text-yellow-500', label: 'Умеренный' },
	{ color: 'text-orange-500', label: 'Высокий' },
	{ color: 'text-red-500', label: 'Очень высокий' },
	{ color: 'text-purple-500', label: 'Экстремальный' },
]
export const UVIndexBreakpoints = [2, 5, 7, 10]

export type AirQualityResponse = {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	current_units: {
		time: string // "iso8601"
		interval: string // "seconds"
		european_aqi: string // "EAQI"
		pm10: string // "μg/m³"
		pm2_5: string // "μg/m³"
		dust: string // "μg/m³"
		uv_index: string
		uv_index_clear_sky: string
		ragweed_pollen: string // "grains/m³"
		olive_pollen: string // "grains/m³"
		mugwort_pollen: string // "grains/m³"
		birch_pollen: string // "grains/m³"
		grass_pollen: string // "grains/m³"
		alder_pollen: string // "grains/m³"
	}
	current: {
		time: string // ISO-8601
		interval: number
		european_aqi: number
		pm10: number
		pm2_5: number
		dust: number
		uv_index: number
		uv_index_clear_sky: number
		ragweed_pollen: number
		olive_pollen: number
		mugwort_pollen: number
		birch_pollen: number
		grass_pollen: number
		alder_pollen: number
	}
}

export type CurrentUnits = AirQualityResponse['current']

export type Pollens = {
	ragweed_pollen: number
	olive_pollen: number
	mugwort_pollen: number
	birch_pollen: number
	grass_pollen: number
	alder_pollen: number
}
