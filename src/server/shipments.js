var constants = require('./constants'),
	utils = require('./utils')

function shipment(shipment_id, weight, vWeight, weight_unit, payment_type, order_value, origin_pincode, destination_pincode, client_id){
	this.shipment_id = shipment_id
	this.weight = parseFloat(weight)
	this.vWeight = vWeight
	this.weight_unit = utils.getKey(constants.weight_units, weight_unit)
	this.payment_type = utils.getKey(constants.payment_types, payment_type)
	this.order_value = parseFloat(order_value)
	this.origin_pincode = constants.pincode_regex.test(origin_pincode) ? origin_pincode : null
	this.destination_pincode = constants.pincode_regex.test(destination_pincode) ? destination_pincode : null
	this.client_id = client_id
	this.status = parseInt(Math.random()*8 + 1) // as there is no status field in the data provided
	this.vendor = parseInt(Math.random()*4 + 1) // as there is no vendor field in the data provided.
	this.zone = parseInt(Math.random()*5 + 1) // no zone provided in data
	this.client_price = 0
	this.vendor_price = 0
}

function calculateShipmentPrice(shipment, billingSlab){
	var zoneSlab = billingSlab.slab.zones[constants.zones[shipment.zone]],
		weight = 0, freight = 0, codCharge = 0, fuelSurcharge = 0

	weight = utils.convert_weight(shipment.weight, shipment.weight_unit, billingSlab.billingBaseUnit)

	freight += zoneSlab.first_500
	freight += (Math.ceil(weight/billingSlab.billingUnitWeight)-1)*zoneSlab.addl_500
	if(shipment.status === constants.STATUS_RETURNED){
		freight += Math.ceil(weight/billingSlab.billingUnitWeight)*zoneSlab.return_500
	}

	codCharge = shipment.order_value * billingSlab.codSlab.percentageCharge / 100
	codCharge = (codCharge > billingSlab.codSlab.baseCharge) ? codCharge : billingSlab.codSlab.baseCharge

	fuelSurcharge = freight * billingSlab.fuelSurcharge

	return freight + codCharge + fuelSurcharge
}

function Summary(total_amount_charged, num_of_shipments_delivered){
	this.total_amount_charged = total_amount_charged
	this.num_of_shipments_delivered = num_of_shipments_delivered
}

module.exports = {
	calculateShipmentPrice: calculateShipmentPrice,
	shipment: shipment,
	Summary: Summary
}