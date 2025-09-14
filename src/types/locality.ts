export interface SecrchLocality {
	place_id: number
	licence: string
	osm_type: string
	osm_id: number
	lat: string
	lon: string
	class: string
	type: string
	place_rank: number
	importance: number
	addresstype: string
	name: string
	display_name: string
	boundingbox: string[]
}

// "id": 472045,
//       "name": "Воронеж",
//       "latitude": 51.67204,
//       "longitude": 39.1843,
//       "elevation": 156,
//       "feature_code": "PPLA",
//       "country_code": "RU",
//       "admin1_id": 472039,
//       "timezone": "Europe/Moscow",
//       "population": 1047549,
//       "country_id": 2017370,
//       "country": "Россия",
//       "admin1": "Воронежская Область"

export interface SecrchLocalityOpenMeteo {
	id: number
	name: string
	latitude: number
	longitude: number
	elevation: number
	feature_code: string
	country_code: string
	admin1_id: number
	timezone: string
	population: number
	country_id: number
	country: string
	admin1: string
}

export interface IpUserLocality {
	// regionName: string
	// cityName: string
	// latitude: string
	// longitude: string
	country_name: string
	region: string
	city: string
	latitude: number
	longitude: number
}

export interface IpUserLocalityReserve extends Exclude<IpUserLocality, 'country_name'> {
	country: string
}

export interface LatLonUserLocality {
	address: {
		city: string
		state: string
	}
}
