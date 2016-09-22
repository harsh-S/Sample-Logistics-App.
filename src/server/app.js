var app = require('express')(),
	bodyParser = require('body-parser'),
	fs = require('fs'),
	constants = require('./constants'),
	shipmentUtils = require('./shipments'),
	reminders = [],
	apiCallLogs = [],
	intervalObj = {}

app.use(bodyParser.json())   	    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain)

app.post('/fetchShipments', function(req, res) {
	fs.readFile(constants.filePath, function(err, data){
		if(err) {
			// TODO: use logger
			console.log("Error reading shipments data", err)
			return
		}

		var lines = data.split('\n').slice(1),
			vendorSummary = {}, clientSummary = {}, shipments = []
	
		Object.keys(constants.vendors).forEach(function(key){
			vendorSummary[key] = new shipmentUtils.Summary(0,0)
		})

		lines.forEach(function(line, idx) {
			var arr = line.split(','),
				shipment = new shipmentUtils.shipment(arr[0], arr[1], null, arr[2], arr[3], arr[4], arr[5], arr[6], arr[7]),
				vendor_price = 0, client_price = 0
			
			if([constants.STATUS_DELIVERED, constants.STATUS_RETURNED].indexOf(shipment.status) !== -1){
				vendor_price = shipmentUtils.calculateShipmentPrice(shipment, constants.vendors[shipment.vendor].billingSlab)
				client_price = shipmentUtils.calculateShipmentPrice(shipment, constants.clientRates.billingSlab)

				// Summary calculated only for DELIVERED or RETURNED shipments

				vendorSummary[shipment.vendor].total_amount_charged += shipment.vendor_price
				vendorSummary[shipment.vendor].num_of_shipments_delivered++

				if(clientSummary[shipment.client_id] === undefined) clientSummary[shipment.client_id] = new shipmentUtils.Summary(0,0)
				clientSummary[shipment.client_id].total_amount_charged += shipment.client_price
				clientSummary[shipment.client_id].num_of_shipments_delivered++
			}
			
			if((idx >= offset) && (idx < (offset + limit))) shipments.push(shipment)
		})

		// TODO: Pagination for clientSummary, possibly sort clientSummary, vendorSummary ?

		res.send({
			vendorSummary: vendorSummary,
			clientSummary: clientSummary,
			shipments: shipments,
			success: true
		})
	})
})

app.listen(3000, function(){console.log("Server started")})