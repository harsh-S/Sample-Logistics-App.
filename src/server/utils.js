var constants = require('./constants')

function getKey(obj, value){
	var keys = Object.keys(obj).filter(function(key){
		return obj[key] === value
	})
	if(keys.length === 1) return keys[0]
	else return null
}

function convert_to_grams(value, from_unit){
	switch(from_unit){
		case constants.WEIGHT_UNIT_KILOGRAM:
			return value * 1000
		case constants.WEIGHT_UNIT_GRAM:
			return value
		default:
			return 0
	}
}

function convert_to_kilograms(value, from_unit){
	switch(from_unit){
		case constants.WEIGHT_UNIT_GRAM:
			return value / 1000
		case constants.WEIGHT_UNIT_KILOGRAM:
			return value
		default:
			return 0
	}
}

function convert_weight(value, from_unit, to_unit){
	switch(to_unit){
		case constants.WEIGHT_UNIT_GRAM:
			return convert_to_grams(value, from_unit)
		case constants.WEIGHT_UNIT_KILOGRAM:
			return convert_to_kilograms(value, from_unit)
		default:
			return 0
	}
}

module.exports = {
	getKey: getKey,
	convert_to_grams: convert_to_grams,
	convert_to_kilograms: convert_to_kilograms,
	convert_weight: convert_weight
}