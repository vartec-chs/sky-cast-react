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

export interface LatLonUserLocality {
	address: {
		city: string
		state: string
	}
}
