import { BASE_URL } from './constants.js'

export function fetchShipments(offset, limit, successCallback, errorCallback){
	$.ajax({
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		url: BASE_URL + 'fetchShipments/',
		data: JSON.stringify({offset: offset, limit: limit}),
		success: successCallback,
		error: errorCallback
	})
}