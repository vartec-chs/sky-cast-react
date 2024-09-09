export const weatherApiUrl = new URL('https://api.open-meteo.com/v1/forecast')


export const weatherModels: { name: string; value: string }[] = [
	{ name: 'По умолчанию', value: 'default' },
	{ name: 'DWD Германия', value: 'icon_seamless' },
	{ name: 'HOAA США', value: 'gfs_seamless' },
	{ name: 'Метео-Франс', value: 'meteofrance_seamless' },
	{ name: 'ЯМА Япония', value: 'jma_seamless' },
	{ name: 'MET Норвегия', value: 'metno_seamless' },
	{ name: 'GEM Канада', value: 'gem_seamless' },
	{ name: 'CMA Китай', value: 'cma_grapes_global' },
	{ name: 'KNMI Нидерланды', value: 'knmi_seamless' },
	{ name: 'ECMWF', value: 'ecmwf_ifs025' },
]