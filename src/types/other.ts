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
