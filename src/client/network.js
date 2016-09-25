import { BASE_URL } from './constants.js'

export function fetchShipments(offset, limit, successCallback, errorCallback){
	$.ajax({
		method: 'GET',
		headers: {'Content-Type': 'application/json'},
		url: BASE_URL + 'api/shipments/',
		data: {offset: offset, limit: limit},
		success: successCallback,
		error: errorCallback
	})
}